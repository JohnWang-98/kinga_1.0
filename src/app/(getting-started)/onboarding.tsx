import Onboarding from '@/components/screens/onboarding';

export default function OnboardingScreen({ route }) {
  const { onComplete } = route.params; // Access the passed param

  return <Onboarding onComplete={onComplete} />;
}
