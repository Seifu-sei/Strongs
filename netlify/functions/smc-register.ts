import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.SUPABASE_URL || process.env.SUPABASE_URL_PUBLIC || process.env.VITE_SUPABASE_URL) as string | undefined;
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY) as string | undefined;

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    if (!supabaseUrl || !supabaseKey) {
      return { statusCode: 500, body: JSON.stringify({ ok: false, message: 'Server is not configured (missing SUPABASE_URL or SUPABASE_SERVICE_ROLE).' }) };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    let parsed: any = {};
    try {
      parsed = JSON.parse(event.body || '{}');
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, message: 'Invalid JSON body' }) };
    }

    const {
      firstName, lastName, otherNames,
      dob, gender, maritalStatus,
      phone, whatsapp, email,
      address, state, lga,
      institution, department, level,
      fellowship, calling, counselling,
      otherFellowship, otherDepartment, otherLevel, otherCounselling,
      photoBase64, photoName
    } = parsed;

    let photo_url: string | null = null;
    if (photoBase64 && photoName) {
      const fileBytes = Buffer.from(photoBase64, 'base64');
      const filePath = `photos/${Date.now()}_${photoName}`;
      const ext = (photoName as string).toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
      const { data: uploadData, error: uploadErr } = await supabase
        .storage.from('smc-photos').upload(filePath, fileBytes, { contentType: ext, cacheControl: '3600', upsert: false });
      if (!uploadErr && uploadData) {
        const { data: publicUrl } = supabase.storage.from('smc-photos').getPublicUrl(uploadData.path);
        photo_url = publicUrl.publicUrl;
      } // if upload fails (e.g., bucket missing), continue without photo

    }

    const { error: insertErr } = await supabase.from('smc_registrations').insert([{ 
      first_name: firstName,
      last_name: lastName,
      other_names: otherNames || null,
      dob,
      gender,
      marital_status: maritalStatus,
      phone,
      whatsapp,
      email,
      address,
      state,
      lga: lga || '',
      institution,
      department,
      level,
      fellowship,
      calling,
      counselling,
      other_fellowship: otherFellowship || null,
      other_department: otherDepartment || null,
      other_level: otherLevel || null,
      other_counselling: otherCounselling || null,
      photo_url
    }]);
    if (insertErr) {
      return { statusCode: 500, body: JSON.stringify({ ok: false, message: `Save failed: ${insertErr.message}` }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, message: e.message || 'Failed' }) };
  }
};