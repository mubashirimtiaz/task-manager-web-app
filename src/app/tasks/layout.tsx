import NavbarComponent from '../components/navbar';

interface TaskLayoutProps {
  children: React.ReactNode;
}

export default function TaskLayout({ children }: TaskLayoutProps) {
  return (
    <div className='px-3'>
      <NavbarComponent />
      {children}
    </div>
  );
}
