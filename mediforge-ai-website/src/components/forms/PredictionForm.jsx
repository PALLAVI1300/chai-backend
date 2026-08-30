import { useState } from 'react';
import Button from '../ui/Button';

export default function PredictionForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    age: '',
    symptoms: '',
    medicalHistory: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-white/70 mb-2">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter patient age"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan-300/50 transition-colors"
          required
        />
      </div>

      <div>
        <label htmlFor="symptoms" className="block text-sm font-medium text-white/70 mb-2">
          Symptoms
        </label>
        <textarea
          id="symptoms"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          placeholder="Describe the symptoms"
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan-300/50 transition-colors resize-none"
          required
        />
      </div>

      <div>
        <label htmlFor="medicalHistory" className="block text-sm font-medium text-white/70 mb-2">
          Medical History
        </label>
        <textarea
          id="medicalHistory"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          placeholder="Relevant medical history"
          rows={2}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan-300/50 transition-colors resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Submit for Analysis'}
      </Button>
    </form>
  );
}