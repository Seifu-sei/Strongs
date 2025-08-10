import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.SUPABASE_URL || process.env.SUPABASE_URL_PUBLIC || process.env.VITE_SUPABASE_URL) as string | undefined;
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY) as string | undefined;

function maskKey(key?: string) {
  if (!key) return 'missing';
  const start = key.slice(0, 6);
  const end = key.slice(-4);
  return `${start}...${end} (len:${key.length})`;
}

function extractRefFromUrl(url?: string) {
  try {
    if (!url) return null;
    const u = new URL(url);
    const host = u.hostname; // e.g., vnweaffjngcjkrrfsvzl.supabase.co
    const ref = host.split('.')[0];
    return { host, ref };
  } catch {
    return null;
  }
}

function decodeRefFromJwt(jwt?: string) {
  try {
    if (!jwt) return null;
    const parts = jwt.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8')) as any;
    return { ref: payload?.ref, role: payload?.role };
  } catch {
    return null;
  }
}

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const urlInfo = extractRefFromUrl(supabaseUrl);
    const keyInfo = decodeRefFromJwt(supabaseKey);

    if (!supabaseUrl || !supabaseKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          message: 'Server is not configured (missing SUPABASE_URL or SUPABASE_SERVICE_ROLE).',
          diagnostics: {
            supabaseUrlPresent: !!supabaseUrl,
            supabaseKeyPresent: !!supabaseKey,
            supabaseUrlHost: urlInfo?.host || null,
            supabaseUrlRef: urlInfo?.ref || null,
            keyMasked: maskKey(supabaseKey),
            keyRole: keyInfo?.role || null,
            keyRef: keyInfo?.ref || null,
            keyMatchesUrlRef: keyInfo?.ref && urlInfo?.ref ? keyInfo.ref === urlInfo.ref : null,
          },
        }),
      };
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

    // Optional sanity check: minimal query to detect key issues early
    const ping = await supabase.from('smc_registrations').select('id').limit(1);
    if (ping.error && ping.error.message?.toLowerCase().includes('api key')) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          message: `Supabase error: ${ping.error.message}`,
          diagnostics: {
            supabaseUrlHost: urlInfo?.host || null,
            supabaseUrlRef: urlInfo?.ref || null,
            keyMasked: maskKey(supabaseKey),
            keyRole: keyInfo?.role || null,
            keyRef: keyInfo?.ref || null,
            keyMatchesUrlRef: keyInfo?.ref && urlInfo?.ref ? keyInfo.ref === urlInfo.ref : null,
          },
        }),
      };
    }

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
      } // continue without photo if upload fails
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
      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          message: `Save failed: ${insertErr.message}`,
          diagnostics: {
            supabaseUrlHost: urlInfo?.host || null,
            supabaseUrlRef: urlInfo?.ref || null,
            keyMasked: maskKey(supabaseKey),
            keyRole: keyInfo?.role || null,
            keyRef: keyInfo?.ref || null,
            keyMatchesUrlRef: keyInfo?.ref && urlInfo?.ref ? keyInfo.ref === urlInfo.ref : null,
          },
        }),
      };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e: any) {
    return { statusCode: 500, body: JSON.stringify({ ok: false, message: e.message || 'Failed' }) };
  }
};