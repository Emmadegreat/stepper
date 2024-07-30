'use client'

import Stepper from '../../components/progressbar';

interface Step {
  name: string;
  Component: React.FC; // Define that Component is a functional component
}

const CHECKOUT_STEPS: Step[] = [
  {
    name: `Your details`,
    Component: () => <div className='hidden'>Provide your contact details.</div>,
  },
  {
    name: "Personalisation",
    Component: () => <div className='hidden'>Enter your shipping address.</div>,
  },
  {
    name: "Profile",
    Component: () => <div className='hidden'>Complete payment for your order.</div>,
  },
];

const PageFlow: React.FC = () => {
  return (
    <div className='pt-[2rem] text-center text-green-500 mx-4'>
      <h2></h2>
      <Stepper stepsConfig={CHECKOUT_STEPS} />
    </div>
  );
}

export default PageFlow;

