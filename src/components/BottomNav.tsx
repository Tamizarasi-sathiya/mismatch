import { Home, MessageCircle, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BottomNav() {
  const router = useRouter();
  const currentPath = router.pathname;

  const navItems = [
    { name: 'Home', icon: Home, path: '/home' },
    { name: 'Chat', icon: MessageCircle, path: '/chat' },
    { name: 'Cupid', icon: Sparkles, path: '/cupid' },
    { name: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-[#F3F0FF] pb-safe z-50">
      <div className="flex justify-around items-center p-4">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.path} className="flex flex-col items-center gap-1">
              <div className={`p-2 rounded-2xl transition-all ${isActive ? 'bg-[#F3F0FF] text-[#A78BFA]' : 'text-[#9CA3AF]'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'text-[#A78BFA]' : 'text-[#9CA3AF]'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
