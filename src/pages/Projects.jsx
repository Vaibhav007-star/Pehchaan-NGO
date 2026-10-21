import React from 'react';
import { 
  BookOpen, 
  Heart, 
  RotateCcw, 
  Users, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Phone
} from 'lucide-react';
import { PROJECTS, NGO_INFO } from '../data/ngoData';

export default function Projects({ onOpenDonate, onOpenRegister }) {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Action On The Ground</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading">
          Our Flagship Welfare Projects
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          From street education at Gyan Jyoti to clinical malnutrition recovery under Project Ankur and circular apparel distribution under The Power of Re-Use.
        </p>
      </div>

      {/* Projects Deep Dive List */}
      <div className="space-y-12">
        {PROJECTS.map((proj, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div 
              key={proj.id}
              className={`bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-stretch`}
            >
              
              {/* Image half */}
              <div className="lg:w-1/2 relative min-h-[300px]">
                <img 
                  src={proj.image} 
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold text-xs">
                  {proj.tag}
                </span>
              </div>

              {/* Text half */}
              <div className="lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Project #{idx + 1}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
                    {proj.title}
                  </h2>
                  <p className="text-sm text-slate-700 leading-relaxed mt-3">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 block mb-1">Demonstrated Impact:</span>
                    <p className="text-slate-600">{proj.impact}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={onOpenDonate}
                      className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
                    >
                      <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>Sponsor this Project</span>
                    </button>
                    <button
                      onClick={onOpenRegister}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
                    >
                      Volunteer for this Project
                    </button>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* CLOTHES & IN-KIND DONATION DRIVE FAQ (FROM SCRAPED SITE) */}
      <div className="bg-amber-50/50 rounded-3xl p-8 sm:p-10 border border-amber-200 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            The Power of Re-Use Guidelines
          </span>
          <h3 className="text-2xl font-black text-slate-900 font-heading mt-1">
            How to Donate Old Clothes, Books & In-Kind Essentials
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Directly from the Pehchaan NGO Collection Center Guidebook.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          
          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 space-y-1">
            <h4 className="font-bold text-slate-900">Where will my donated clothes go?</h4>
            <p className="text-slate-600 leading-relaxed">
              Our clothes drives exclusively benefit children and adults in calamity zones, needy rural villages in Bundelkhand & Chambal Sanctuary, under flyovers, railway track clusters, and construction site daily wagers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 space-y-1">
            <h4 className="font-bold text-slate-900">Collection Center Location in Ghaziabad:</h4>
            <p className="text-slate-600 leading-relaxed">
              Located at <strong>274/6, Charan Singh Colony, L Block, Sector 12, Pratap Vihar, Ghaziabad UP 201009</strong> (just 5 minutes from Dominos Pizza).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 space-y-1">
            <h4 className="font-bold text-slate-900">Are you open on Sundays?</h4>
            <p className="text-slate-600 leading-relaxed">
              Yes, our collection center remains open on Sundays between <strong>10:00 AM – 5:00 PM</strong> for dropping off clothes, blankets, and supplies.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 space-y-1">
            <h4 className="font-bold text-slate-900">Do you accept other in-kind items?</h4>
            <p className="text-slate-600 leading-relaxed">
              Yes, we actively accept children's storybooks, textbooks, medicines, stationary, educational toys, and functional electronics. Helpline: <strong>+91 9457320905</strong>.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

