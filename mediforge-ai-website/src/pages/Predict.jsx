import { useState } from 'react';
import PredictionForm from '../components/forms/PredictionForm';
import PredictionResult from '../components/results/PredictionResult';
import Card from '../components/ui/Card';

export default function Predict() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResult({
      diagnosis: 'Hypertension',
      confidence: 0.87,
      recommendations: ['Monitor blood pressure regularly', 'Reduce sodium intake', 'Increase physical activity']
    });
    setIsLoading(false);
  };

  return (
    <section id="predict" className="relative overflow-hidden bg-[#050505] text-white py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(8,145,178,0.06),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.018] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 mx-auto max-w-[900px] px-6 md:px-10 lg:px-14">
        <div className="text-center mb-12">
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.28em] text-cyan-300/75">05</span>
          <div className="mt-3 flex justify-center">
            <span className="h-px w-12 md:w-16 bg-cyan-300/65" />
          </div>
          <h2 className="mt-5 font-display font-semibold text-[clamp(2.5rem,4.5vw,4.8rem)] leading-[0.88] tracking-[-0.06em] text-white">
            PREDICTIVE ANALYSIS
          </h2>
          <p className="mt-4 font-mono text-[8px] md:text-[9px] tracking-[0.22em] text-white/35">
            AI-POWERED HEALTHCARE INSIGHTS
          </p>
          <p className="mx-auto mt-8 max-w-[760px] text-[13px] md:text-sm lg:text-[15px] leading-[1.7] text-white/60">
            Enter patient information to receive AI-driven analysis and recommendations based on biomedical research.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <h3 className="font-display text-xl font-semibold text-white mb-6">Patient Information</h3>
            <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
          </Card>

          <div>
            {isLoading ? (
              <Card className="flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <div className="w-12 h-12 border-3 border-cyan-300/30 border-t-cyan-300 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white/50">Analyzing patient data...</p>
                </div>
              </Card>
            ) : (
              <PredictionResult result={result} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}