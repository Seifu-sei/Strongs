import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body || '{}');

    const {
      firstName, lastName, otherNames,
      dob, gender, maritalStatus,
      phone, whatsapp, email,
      address, state, lga,
      institution, department, level,
      fellowship, calling, counselling,
      otherFellowship, otherDepartment, otherLevel, otherCounselling,
      photoBase64, photoName
    } = body;

    let photo_url: string | null = null;
    if (photoBase64 && photoName) {
      const fileBytes = Buffer.from(photoBase64, 'base64');
      const filePath = `photos/${Date.now()}_${photoName}`;
      const { data: uploadData, error: uploadErr } = await supabase
        .storage.from('smc-photos').upload(filePath, fileBytes, { contentType: 'image/jpeg' });
      if (uploadErr) throw uploadErr;
      const { data: publicUrl } = supabase.storage.from('smc-photos').getPublicUrl(uploadData!.path);
      photo_url = publicUrl.publicUrl;
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
    if (insertErr) throw insertErr;

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, message: e.message || 'Failed' }) };
  }
};