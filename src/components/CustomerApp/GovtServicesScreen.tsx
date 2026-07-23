import React, { useState } from 'react';
import { Landmark, FileText, HeartPulse, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_GOVT_SERVICES } from '../../data/mockData';
import { GovtServiceItem } from '../../types';

export const GovtServicesScreen: React.FC = () => {
  const [selectedGovtSrv, setSelectedGovtSrv] = useState<GovtServiceItem | null>(null);
  const [aadhaarOrKhasra, setAadhaarOrKhasra] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState<boolean>(false);

  const handleSubmitApplication = () => {
    if (!aadhaarOrKhasra) {
      alert('कृपया आवश्यक संख्या / विवरण दर्ज करें।');
      return;
    }
    setSubmittedStatus(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 p-5 sm:p-6 rounded-3xl text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-sm">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">
              सीएससी डिजिटल सेवा केंद्र (CSC Government Kendra)
            </h1>
            <p className="text-xs text-slate-300">
              पीएम किसान सम्मान निधि, खतौनी नकल, आयुष्मान कार्ड एवं आधार अपडेट आवेदन घर बैठे करें।
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOCK_GOVT_SERVICES.map(srv => (
          <div
            key={srv.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  {srv.deptHi}
                </span>
                <span className="font-bold text-emerald-700">
                  {srv.fee === 0 ? 'निःशुल्क (FREE)' : `शुल्क: ₹${srv.fee}`}
                </span>
              </div>

              <h3 className="font-bold text-slate-800 text-sm mb-2">{srv.titleHi}</h3>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1 mb-3">
                <div className="font-semibold text-slate-800">आवश्यक दस्तावेज (Required Documents):</div>
                <ul className="list-disc list-inside text-[11px] text-slate-500">
                  {srv.docRequired.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedGovtSrv(srv);
                setSubmittedStatus(false);
                setAadhaarOrKhasra('');
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold text-white text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>आवेदन / स्थिति देखें (Apply Now)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Application Drawer Modal */}
      {selectedGovtSrv && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl text-slate-800">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-bold text-indigo-950 text-sm">{selectedGovtSrv.titleHi}</h3>
              <button onClick={() => setSelectedGovtSrv(null)} className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer">✕</button>
            </div>

            {submittedStatus ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <div className="font-bold text-slate-800 text-sm">आवेदन सफलता से स्वीकार हुआ!</div>
                <p className="text-xs text-slate-600">
                  सीएससी केंद्र मलिहाबाद द्वारा आपका आवेदन संसाधित किया जा रहा है। एसएमएस द्वारा स्टेटस भेजा जाएगा।
                </p>
                <button
                  onClick={() => setSelectedGovtSrv(null)}
                  className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                >
                  बंद करें
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-600">
                <div>
                  <label className="block mb-1 font-semibold text-slate-800">
                    आधार संख्या / खतौनी गाटा संख्या दर्ज करें:
                  </label>
                  <input
                    type="text"
                    value={aadhaarOrKhasra}
                    onChange={e => setAadhaarOrKhasra(e.target.value)}
                    placeholder="e.g. 9839 1204 8590 या गाटा 112"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
                  सीएससी ऑपरेटर आपके ग्राम में डिजिटल सत्यापन कर 24 घंटे में प्रमाण पत्र / स्थिति रिपोर्ट उपलब्ध कराएगा।
                </div>

                <button
                  onClick={handleSubmitApplication}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  डिजिटल आवेदन भेजें (Submit)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
