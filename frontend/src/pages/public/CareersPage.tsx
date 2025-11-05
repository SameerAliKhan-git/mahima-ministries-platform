import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CareersPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to contact page
    navigate('/contact', { replace: true });
  }, [navigate]);

  return null;
}
