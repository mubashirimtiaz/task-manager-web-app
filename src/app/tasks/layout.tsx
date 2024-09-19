import NavbarComponent from '../components/navbar';

interface TaskLayoutProps {
  children: React.ReactNode;
}

export default function TaskLayout({ children }: TaskLayoutProps) {
  return (
    <div>
      <NavbarComponent />
      <div className='p-3'>{children}</div>
    </div>
  );
}
