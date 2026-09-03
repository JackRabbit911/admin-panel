import {
  BookOpenText,
  Users,
  BugPlay,
  Code,
  HardDriveDownload,
  CodeXml,
  Languages,
  UserStar,
  DollarSign,
  Trophy,
  Database,
  CalendarClock,
  SquareStack,
  Broom,
  type LucideProps
} from 'lucide-react';

const iconMap = {
  book_open_text: BookOpenText,
  users: Users,
  bug_play: BugPlay,
  code: Code,
  hard_drive_download: HardDriveDownload,
  code_xml: CodeXml,
  languages: Languages,
  user_star: UserStar,
  dollar_sign: DollarSign,
  trophy: Trophy,
  database: Database,
  calendar_clock: CalendarClock,
  square_stack: SquareStack,
  broom: Broom,
} as const;
export type IconName = keyof typeof iconMap;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = iconMap[name];

  return <LucideIcon {...props} />;
}

export default Icon
