interface FeatureBadgeProps {
  isActive: boolean;
  activeText: string;
  inactiveText: string;
  activeIcon: React.ComponentType<{ className?: string }>;
  inactiveIcon: React.ComponentType<{ className?: string }>;
  activeClass: string;
  inactiveClass: string;
}

export const FeatureBadge = ({
  isActive,
  activeText,
  inactiveText,
  activeIcon: ActiveIcon,
  inactiveIcon: InactiveIcon,
  activeClass,
  inactiveClass,
}: FeatureBadgeProps) => (
  <div
    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
      isActive ? activeClass : inactiveClass
    }`}
  >
    {isActive ? (
      <ActiveIcon className="w-5 h-5 mr-2" />
    ) : (
      <InactiveIcon className="w-5 h-5 mr-2" />
    )}
    <span className="text-sm font-medium">
      {isActive ? activeText : inactiveText}
    </span>
  </div>
);
