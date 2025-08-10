import React, { useMemo, useRef, useState } from "react";
import { API_BASE_URL } from "../config";
import smcBanner from "../assets/images/lautech-smc.jpg";

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
    lga: "",
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
    try {
      if (API_BASE_URL) {
        const formData = new FormData();
        Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)));
        if (photoFile) formData.append("photo", photoFile);
        const res = await fetch(`${API_BASE_URL}/api/smc/register`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to submit");
        setMessage("Registration submitted successfully.");
      } else {
        const existing = JSON.parse(localStorage.getItem("mock_smc") || "[]");
        const id = (crypto as any).randomUUID?.() || String(Date.now());
        const payload = { id, ...form, photoName: photoFile?.name || null, createdAt: new Date().toISOString() };
        existing.push(payload);
        localStorage.setItem("mock_smc", JSON.stringify(existing));
        setMessage("Registration saved locally (offline mode).");
      }
    } catch (err: any) {
      setMessage(err.message);
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
        <div className="mb-6 overflow-hidden rounded-lg">
          <img
            src={smcBanner}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://drive.google.com/uc?export=view&id=10jpc9TV1oHnUbB1aaH57OHkC5TRPUKGD";
            }}
            alt="SMC Registration Banner"
            className="w-full h-48 object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">SMC Registration</h1>

        <div className="mb-6 text-center text-sm">
          <span className="text-gray-600 dark:text-gray-300">Have a Strongs account? </span>
          <a href="#/signin" className="text-blue-700">Sign in</a>
          <span className="mx-2">or</span>
          <a href="#/signup" className="text-blue-700">Sign up</a>
        </div>

        {message && (
          <div className="mb-4 text-sm p-3 rounded border" role="alert">
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
            <div>
              <label className="block mb-1">LGA</label>
              <input name="lga" value={form.lga} onChange={handleChange} required className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
            </div>
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
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="consent" name="consent" checked={!!form.consent} onChange={handleChange} required />
            <label htmlFor="consent" className="text-sm">I consent to the processing of my data for SMC registration in line with applicable regulations.</label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button disabled={submitting} type="submit" className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-md">{submitting ? "Submitting..." : "Register"}</button>
            <button type="button" onClick={handleDownloadId} className="sm:w-56 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md">Download ID (PDF)</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SmcRegistrationPage;
