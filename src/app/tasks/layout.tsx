import NavbarComponent from '../components/navbar';

interface TaskLayoutProps {
  children: React.ReactNode;
}

export default function TaskLayout({ children }: TaskLayoutProps) {
  return (
    <div>
      <NavbarComponent />
      <div className='p-3 max-w-screen-lg mx-auto'>{children}</div>
    </div>
  );
}
