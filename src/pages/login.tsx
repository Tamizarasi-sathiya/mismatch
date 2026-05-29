import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Smartphone, Mail, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'phone' && phoneNumber.length >= 10) {
      setStep('otp');
    } else if (step === 'otp' && otp.length === 4) {
      // Fake auth success -> send to home/dashboard
      router.push('/home');
    }
  };

  return (
    <>
      <Head>
        <title>Login | MisMatch</title>
      </Head>
      <main className="min-h-screen bg-[#FAFAFE] flex flex-col justify-between p-6">
        
        {/* Header Section */}
        <div className="pt-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-12 h-12 bg-gradient-to-br from-[#A78BFA] to-[#F9A8D4] rounded-xl flex items-center justify-center mb-6"
          >
            <span className="text-white text-2xl">💜</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-[#1E1B2E] mb-2"
          >
            {step === 'phone' ? "What's your number?" : "Enter the code"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#6B7280] text-sm"
          >
            {step === 'phone' 
              ? "We'll send a code to verify it's you. No passwords needed."
              : `Sent to ${phoneNumber}. Didn't get it? Tap to resend.`}
          </motion.p>
        </div>

        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 mt-10"
        >
          <form onSubmit={handleContinue} className="space-y-6">
            {step === 'phone' ? (
              <div className="flex bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(167,139,250,0.08)] border border-[#F3F0FF]">
                <span className="text-[#1E1B2E] font-medium mr-3 border-r pr-3 border-gray-100 flex items-center">
                  +91
                </span>
                <input 
                  type="tel" 
                  placeholder="98765 43210" 
                  className="flex-1 outline-none text-[#1E1B2E] font-medium placeholder-[#9CA3AF] bg-transparent"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={10}
                  autoFocus
                />
              </div>
            ) : (
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="1 2 3 4" 
                  className="w-full text-center tracking-[1em] text-2xl font-bold bg-white rounded-2xl py-4 shadow-[0_2px_12px_rgba(167,139,250,0.08)] border border-[#F3F0FF] outline-none focus:border-[#A78BFA] transition-colors"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={4}
                  autoFocus
                />
              </div>
            )}

            <button 
              type="submit"
              disabled={step === 'phone' ? phoneNumber.length < 10 : otp.length < 4}
              className="w-full bg-[#A78BFA] text-white py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:bg-[#D8B4E2] transition-all hover:bg-[#8B5CF6] active:scale-95 shadow-md shadow-violet-200"
            >
              Continue <ArrowRight size={20} />
            </button>
          </form>

          {/* Social Logins */}
          {step === 'phone' && (
            <div className="mt-12 space-y-4">
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-400 uppercase tracking-widest">Or continue with</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button className="w-full bg-white text-[#1E1B2E] py-4 rounded-full font-semibold border border-gray-200 flex items-center justify-center gap-3 active:scale-95 transition-all">
                <Mail size={20} className="text-red-500" />
                Google
              </button>
              
              <button className="w-full bg-[#1E1B2E] text-white py-4 rounded-full font-semibold border border-transparent flex items-center justify-center gap-3 active:scale-95 transition-all">
                <Smartphone size={20} />
                Apple
              </button>
            </div>
          )}
        </motion.div>
      </main>
    </>
  );
}
