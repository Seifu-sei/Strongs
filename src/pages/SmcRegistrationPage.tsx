import React, { useMemo, useRef, useState } from "react";
import { HAS_SUPABASE } from "../config";
import { supabase } from "../lib/supabaseClient";

// Use only a root-level smc.jpg if present
const rootAssets = (import.meta as any).glob("../assets/*", { eager: true, import: "default", query: "?url" }) as Record<string, string>;
const smcBanner = rootAssets["../assets/smc.jpg"] as string | undefined;

const nigeriaStates = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT"
];

const fellowshipOptions = [
  "CAC Youth Fellowship",
  "Redeemed Christian Fellowsip",
  "CACSOR",
  "CACSA",
  "BLHCF",
  "Other (please specify)",
];

const departmentOptions = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Electrical Engineering",
  "Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Other",
];

const levelOptions = ["100", "200", "300", "400", "500", "Graduate", "Other"];

const callingOptions = [
  "Pastoral",
  "Teaching",
  "Evangelism",
  "Prophetic",
  "Apostolic",
  "Helps",
  "None/Not Sure",
];

const counsellingOptions = [
  "No",
  "Yes - Academic",
  "Yes - Spiritual",
  "Yes - Emotional",
  "Yes - Family",
  "Yes - Other",
];

type MessageType = "success" | "error" | null;

const SmcRegistrationPage: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    otherNames: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    state: "",
    lga: "", // kept in state but not shown in UI
    institution: "",
    fellowship: "",
    department: "",
    level: "",
    calling: "",
    counselling: "",
    otherFellowship: "",
    otherDepartment: "",
    otherLevel: "",
    otherCounselling: "",
    consent: false,
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType>(null);
  const idCardRef = useRef<HTMLDivElement>(null);

  const fullName = useMemo(() => `${form.lastName} ${form.firstName} ${form.otherNames}`.trim(), [form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target as HTMLInputElement;
    const value = type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setMessageType(null);
    try {
      if (!(HAS_SUPABASE && supabase)) {
        throw new Error("Registration service is not configured. Please try again later.");
      }

      // Upload photo if present
      let photo_url: string | null = null;
      if (photoFile) {
        const filePath = `photos/${Date.now()}_${photoFile.name}`;
        const { data: uploadData, error: uploadErr } = await supabase
          .storage
          .from('smc-photos')
          .upload(filePath, photoFile, { upsert: false });
        if (uploadErr) throw uploadErr;
        const { data: publicUrl } = supabase
          .storage
          .from('smc-photos')
          .getPublicUrl(uploadData!.path);
        photo_url = publicUrl.publicUrl;
      }

      const { error: insertErr } = await supabase
        .from('smc_registrations')
        .insert([{ 
          first_name: form.firstName,
          last_name: form.lastName,
          other_names: form.otherNames || null,
          dob: form.dob,
          gender: form.gender,
          marital_status: form.maritalStatus,
          phone: form.phone,
          whatsapp: form.whatsapp,
          email: form.email,
          address: form.address,
          state: form.state,
          lga: form.lga || "",
          institution: form.institution,
          department: form.department,
          level: form.level,
          fellowship: form.fellowship,
          calling: form.calling,
          counselling: form.counselling,
          other_fellowship: form.otherFellowship || null,
          other_department: form.otherDepartment || null,
          other_level: form.otherLevel || null,
          other_counselling: form.otherCounselling || null,
          photo_url
        }]);
      if (insertErr) throw insertErr;

      setMessageType("success");
      setMessage("Registration submitted successfully.");
    } catch (err: any) {
      setMessageType("error");
      setMessage(err.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadId = async () => {
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import("html2canvas"),
      import("jspdf"),
    ]);
    const card = idCardRef.current;
    if (!card) return;
    const canvas = await html2canvas(card, { backgroundColor: null, scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "A4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const cardWidth = Math.min(pageWidth - 80, 400);
    const aspect = canvas.height / canvas.width;
    const cardHeight = cardWidth * aspect;
    const x = (pageWidth - cardWidth) / 2;
    const y = 80;
    pdf.addImage(imgData, "PNG", x, y, cardWidth, cardHeight);
    pdf.save(`SMC_ID_${fullName || "user"}.pdf`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {smcBanner && (
          <div className="mb-6 overflow-hidden rounded-lg">
            <img
              src={smcBanner}
              alt="SMC Registration Banner"
              className="w-full h-48 object-cover"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold mb-6 text-center">SMC Registration</h1>

        {message && (
          <div className={`mb-4 text-sm p-3 rounded border ${messageType === 'success' ? 'border-green-600 text-green-700' : 'border-red-600 text-red-700'}`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Surname</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
            </div>
            <div>
              <label className="block mb-1">First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
            </div>
            <div>
              <label className="block mb-1">Other Names</label>
              <input name="otherNames" value={form.otherNames} onChange={handleChange} className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
            </div>
            <div>
              <label className="block mb-1">Date of Birth</label>
              <input type="date" name="dob" value={form.dob} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
            </div>
            <div>
              <label className="block mb-1">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Marital Status</label>
              <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                <option value="">Select</option>
                <option>Single</option>
                <option>Married</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Primary Phone</label>
              <input type="tel" name="phone" placeholder="e.g. 08012345678" value={form.phone} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
            </div>
            <div>
              <label className="block mb-1">WhatsApp Number</label>
              <input type="tel" name="whatsapp" placeholder="e.g. 08012345678" value={form.whatsapp} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
            </div>
            <div>
              <label className="block mb-1">Address</label>
              <input name="address" value={form.address} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
            </div>
            <div>
              <label className="block mb-1">State of Residence</label>
              <select name="state" value={form.state} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                <option value="">Select State</option>
                {nigeriaStates.map((s)=> (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
            {/* LGA field removed from UI */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Institution</label>
              <input name="institution" value={form.institution} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
            </div>
            <div>
              <label className="block mb-1">Department</label>
              <select name="department" value={form.department} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                <option value="">Select Department</option>
                {departmentOptions.map((opt)=> (<option key={opt} value={opt}>{opt}</option>))}
              </select>
              {form.department === "Other" && (
                <input className="mt-2 w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" name="otherDepartment" value={form.otherDepartment} onChange={handleChange} placeholder="Please specify" />
              )}
            </div>
            <div>
              <label className="block mb-1">Level</label>
              <select name="level" value={form.level} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                <option value="">Select Level</option>
                {levelOptions.map((opt)=> (<option key={opt} value={opt}>{opt}</option>))}
              </select>
              {form.level === "Other" && (
                <input className="mt-2 w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" name="otherLevel" value={form.otherLevel} onChange={handleChange} placeholder="Please specify" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Fellowship</label>
              <select name="fellowship" value={form.fellowship} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                <option value="">Select Fellowship</option>
                {fellowshipOptions.map((opt)=> (<option key={opt} value={opt}>{opt}</option>))}
              </select>
              {form.fellowship === "Other (please specify)" && (
                <input className="mt-2 w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" name="otherFellowship" value={form.otherFellowship} onChange={handleChange} placeholder="Please specify" />
              )}
            </div>
            <div>
              <label className="block mb-1">Calling</label>
              <select name="calling" value={form.calling} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                <option value="">Select Calling</option>
                {callingOptions.map((opt)=> (<option key={opt} value={opt}>{opt}</option>))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Need Counselling?</label>
              <select name="counselling" value={form.counselling} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                <option value="">Select Option</option>
                {counsellingOptions.map((opt)=> (<option key={opt} value={opt}>{opt}</option>))}
              </select>
              {form.counselling === "Yes - Other" && (
                <input className="mt-2 w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" name="otherCounselling" value={form.otherCounselling} onChange={handleChange} placeholder="Please specify" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Passport Photograph</label>
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </div>
            <div ref={idCardRef} className="border rounded p-3 flex items-center gap-3 bg-white dark:bg-gray-900">
              <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                {photoFile ? (
                  <img src={URL.createObjectURL(photoFile)} alt="passport" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-gray-500">No photo</span>
                )}
              </div>
              <div>
                <div className="font-semibold">{fullName || "Full Name"}</div>
                <div className="text-xs text-gray-600">Institution: {form.institution || ""}</div>
                <div className="text-xs text-gray-600">Department: {form.department || ""}</div>
                <div className="text-xs text-gray-600">Fellowship: {form.fellowship || form.otherFellowship || ""}</div>
                <div className="text-xs text-gray-600">Calling: {form.calling || ""}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="consent" name="consent" checked={!!form.consent} onChange={handleChange} required />
            <label htmlFor="consent" className="text-sm">I consent to the processing of my data for SMC registration in line with applicable regulations.</label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button disabled={submitting} type="submit" className={`flex-1 text-white font-semibold py-3 rounded-md ${submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-900'}`}>
              {submitting ? 'Submitting...' : 'Register'}
            </button>
            <button type="button" onClick={handleDownloadId} className="sm:w-56 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md">Download ID (PDF)</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SmcRegistrationPage;
