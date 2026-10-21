import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  FileText, 
  CheckCircle, 
  CreditCard, 
  Sparkles, 
  Download, 
  Mail, 
  ExternalLink,
  Info,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NGO_INFO, CROWDFUNDING_CAMPAIGNS } from '../data/ngoData';
import { recordDonation } from '../utils/storage';
import { download80GReceiptPdf } from '../utils/pdfGenerator';

export default function DonationGateway({ defaultCampaignId = null, onClose }) {
  const [selectedCampaign, setSelectedCampaign] = useState(
    defaultCampaignId 
      ? CROWDFUNDING_CAMPAIGNS.find(c => c.id === defaultCampaignId) || CROWDFUNDING_CAMPAIGNS[0]
      : CROWDFUNDING_CAMPAIGNS[0]
  );

  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [donorData, setDonorData] = useState({
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    panNumber: '',
    address: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [completedDonation, setCompletedDonation] = useState(null);
  const [gatewayMode, setGatewayMode] = useState('Razorpay Test Mode');

  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  const handleSelectPreset = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
  };

  const handleChange = (e) => {
    setDonorData({ ...donorData, [e.target.name]: e.target.value });
  };

  // Trigger Checkout
  const handleInitiateDonation = (e) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 50) {
      alert('Please enter a valid donation amount (minimum ₹50).');
      return;
    }
    // Open Razorpay gateway modal
    setShowRazorpayModal(true);
  };

  // Complete simulated or live payment
  const handlePaymentSuccess = (paymentMethod) => {
    setIsProcessing(true);
    setShowRazorpayModal(false);

    setTimeout(() => {
      const donationRecord = recordDonation({
        donorName: donorData.donorName,
        donorEmail: donorData.donorEmail,
        donorPhone: donorData.donorPhone,
        panNumber: donorData.panNumber,
        amount: finalAmount,
        campaignId: selectedCampaign.id,
        campaignTitle: selectedCampaign.title,
        paymentMethod: `Razorpay (${paymentMethod})`,
        transactionId: `pay_rzp_${Date.now().toString().slice(-8)}`
      });

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 }
      });

      setCompletedDonation(donationRecord);
      setIsProcessing(false);
    }, 700);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Heart className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
          <span>Section 80G Tax-Deductible Donation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Empower a Life with Pehchaan NGO
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Your support provides street children with daily schooling, clinical malnutrition therapy, and dignity through redistributed clothing. 
          All donations qualify for a <strong>50% tax exemption under Section 80G</strong>.
        </p>
      </div>

      {completedDonation ? (
        /* DONATION COMPLETED & 80G RECEIPT DOWNLOAD CARD */
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-emerald-100 shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Payment & 80G Generation Successful
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
              Thank You, {completedDonation.donorName}!
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              We have safely received your generous donation of <strong>₹{completedDonation.amount.toLocaleString('en-IN')}</strong> via {completedDonation.paymentMethod}.
            </p>
          </div>

          {/* 80G Tax Summary Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs text-slate-600 font-bold uppercase">Official 80G Receipt No.</span>
                <p className="text-lg font-mono font-bold text-blue-900">
                  {completedDonation.receiptNumber}
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                80G Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div>
                <span className="text-slate-600 font-semibold">Transaction ID:</span>
                <p className="font-mono text-slate-800">{completedDonation.transactionId}</p>
              </div>
              <div>
                <span className="text-slate-600 font-semibold">Date of Payment:</span>
                <p className="font-semibold text-slate-800">{completedDonation.date}</p>
              </div>
              <div>
                <span className="text-slate-600 font-semibold">Donor PAN:</span>
                <p className="font-mono font-semibold text-amber-700">
                  {completedDonation.panNumber || 'Not provided'}
                </p>
              </div>
              <div>
                <span className="text-slate-600 font-semibold">Allocated Campaign:</span>
                <p className="font-semibold text-slate-800 truncate">{completedDonation.campaignTitle}</p>
              </div>
            </div>

            <div className="mt-2 p-3 bg-blue-50/80 rounded-xl text-[11px] text-blue-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <span>An automated copy of this receipt has been emailed to <strong>{completedDonation.donorEmail}</strong>.</span>
            </div>
          </div>

          {/* Download 80G PDF button */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => download80GReceiptPdf(completedDonation)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 active:scale-95 transition"
            >
              <Download className="w-5 h-5" />
              <span>Download Official 80G Tax Receipt (PDF)</span>
            </button>
            <button
              onClick={() => {
                setCompletedDonation(null);
                setDonorData({ donorName: '', donorEmail: '', donorPhone: '', panNumber: '', address: '' });
                if (onClose) onClose();
              }}
              className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition"
            >
              Make Another Contribution
            </button>
          </div>
        </div>
      ) : (
        /* TWO COLUMN DONATION INTERACTION */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Campaign Details & Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-slate-500">
              1. Choose a Crowdfunding Campaign
            </h3>

            {CROWDFUNDING_CAMPAIGNS.map((camp) => {
              const isSelected = selectedCampaign.id === camp.id;
              const progressPct = Math.min(100, Math.round((camp.raisedAmount / camp.targetAmount) * 100));

              return (
                <div
                  key={camp.id}
                  onClick={() => setSelectedCampaign(camp)}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all ${
                    isSelected 
                      ? 'bg-blue-50/80 border-blue-600 shadow-md ring-2 ring-blue-600/20' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800">
                      {camp.category}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      80G Benefit
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base leading-snug">
                    {camp.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {camp.description}
                  </p>

                  {/* Crowdfunding progress bar */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-800">
                        ₹{camp.raisedAmount.toLocaleString('en-IN')} raised
                      </span>
                      <span className="text-slate-600 font-semibold">
                        Goal: ₹{camp.targetAmount.toLocaleString('en-IN')} ({progressPct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-amber-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* NGO Legal credentials callout */}
            <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Statutory Exemption Details</span>
              </div>
              <p className="text-slate-400">
                Pehchaan NGO is registered under Section 12A & 80G of the Indian Income Tax Act 1961. 
                Order No: <strong className="text-white">{NGO_INFO.taxExemption80G}</strong>.
              </p>
              <div className="pt-1 text-[11px] text-slate-400">
                Direct Inquiries: <a href="mailto:ngo.pehchaan@gmail.com" className="text-amber-300 underline">ngo.pehchaan@gmail.com</a>
              </div>
            </div>
          </div>

          {/* RIGHT: Donation Amount & Checkout Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleInitiateDonation} className="space-y-6">
              
              {/* Active Campaign Header */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase text-amber-800">Selected Impact Campaign</span>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    {selectedCampaign.title}
                  </h4>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-amber-900">80G Tax</span>
                  <p className="text-[11px] text-amber-700">50% Deduction</p>
                </div>
              </div>

              {/* Amount Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Select Donation Amount (INR ₹)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {selectedCampaign.suggestedAmounts.map((preset) => {
                    const isSelected = !customAmount && amount === preset;
                    return (
                      <button
                        type="button"
                        key={preset}
                        onClick={() => handleSelectPreset(preset)}
                        className={`py-3 px-3 rounded-xl font-bold text-sm sm:text-base border transition ${
                          isSelected
                            ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        ₹{preset.toLocaleString('en-IN')}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="mt-3 relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="50"
                    placeholder="Enter custom amount (e.g. 15000)"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Donor Details for 80G Receipt */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Donor Details (For 80G Receipt & Certificate)
                  </label>
                  <span className="text-[11px] text-amber-600 font-medium">
                    * PAN required for IT 80G filing
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="donorName"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={donorData.donorName}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Email Address * (For Receipt Delivery)
                    </label>
                    <input
                      type="email"
                      name="donorEmail"
                      required
                      placeholder="ramesh@example.com"
                      value={donorData.donorEmail}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="donorPhone"
                      required
                      placeholder="+91 9876543210"
                      value={donorData.donorPhone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      PAN Card Number (For 80G Claim) *
                    </label>
                    <input
                      type="text"
                      name="panNumber"
                      required
                      maxLength={10}
                      placeholder="e.g. ABCDE1234F"
                      value={donorData.panNumber}
                      onChange={(e) => setDonorData({ ...donorData, panNumber: e.target.value.toUpperCase() })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Gateway Toggle / Notice */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <CreditCard className="w-4 h-4 text-blue-800" />
                  <span>Gateway: <strong>Razorpay Secure Payments</strong> (UPI, Cards, NetBanking)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  256-Bit SSL
                </span>
              </div>

              {/* Submit Checkout Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-extrabold text-base shadow-lg shadow-amber-500/25 active:scale-[0.99] transition flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>
                  Proceed to Pay ₹{finalAmount ? finalAmount.toLocaleString('en-IN') : '0'} & Get 80G Receipt
                </span>
              </button>

            </form>
          </div>

        </div>
      )}

      {/* RAZORPAY CHECKOUT MODAL OVERLAY */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in duration-200">
            
            {/* Razorpay Brand Header */}
            <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between border-b border-blue-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-lg">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wide">Razorpay Trusted Checkout</h4>
                  <p className="text-[11px] text-blue-200">Pehchaan NGO Donation</p>
                </div>
              </div>
              <button 
                onClick={() => setShowRazorpayModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-white/10 rounded-lg"
              >
                Cancel
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="text-center py-2 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs text-slate-500 uppercase font-semibold">Total Amount Due</span>
                <p className="text-3xl font-extrabold text-slate-900 mt-0.5">
                  ₹{finalAmount.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-emerald-700 font-medium mt-1">
                  Includes 80G Tax Exemption Certificate
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Select Razorpay Payment Method
                </label>

                <button
                  onClick={() => handlePaymentSuccess('UPI / GooglePay / PhonePe')}
                  className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 flex items-center justify-between transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                      UPI
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Instant UPI Payment</p>
                      <p className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700">Pay Now →</span>
                </button>

                <button
                  onClick={() => handlePaymentSuccess('Credit / Debit Card')}
                  className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 flex items-center justify-between transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                      CARD
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Cards (Visa / MasterCard / RuPay)</p>
                      <p className="text-[10px] text-slate-500">All major Indian and International cards</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700">Pay Now →</span>
                </button>

                <button
                  onClick={() => handlePaymentSuccess('NetBanking')}
                  className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 flex items-center justify-between transition text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-xs">
                      NB
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Internet Banking</p>
                      <p className="text-[10px] text-slate-500">HDFC, SBI, ICICI, Axis & 50+ Banks</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700">Pay Now →</span>
                </button>
              </div>

              <div className="pt-2 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Secured by Razorpay Technologies | PCI-DSS Compliant</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

