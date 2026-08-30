import Card from '../ui/Card';

export default function PredictionResult({ result }) {
  if (!result) return null;

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-display text-xl font-semibold text-cyan-300 mb-3">
          Prediction Results
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-white/50">Diagnosis</p>
            <p className="text-lg font-medium text-white">{result.diagnosis}</p>
          </div>
          <div>
            <p className="text-sm text-white/50">Confidence</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full transition-all duration-1000"
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-white">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-white/50">Recommendations</p>
            <ul className="list-disc list-inside text-white/70 mt-1 space-y-1">
              {result.recommendations?.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}