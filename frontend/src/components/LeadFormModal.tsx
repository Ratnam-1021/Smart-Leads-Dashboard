import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../api/axios';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: any;
}

export default function LeadFormModal({ isOpen, onClose, onSuccess, initialData }: LeadFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'New',
    source: 'Website'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ name: '', email: '', status: 'New', source: 'Website' });
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (initialData?._id) await api.put(`/leads/${initialData._id}`, formData);
      else await api.post('/leads', formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative bg-black rounded-xl border border-gray-800 w-full max-w-lg p-8 transform transition-all overflow-hidden">
        
        <div className="flex justify-between items-center mb-8 relative z-10">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {initialData ? 'Update Lead' : 'New Lead'}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors cursor-pointer">
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-6 text-sm font-medium text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20 relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">First & Last Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3.5 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none placeholder-gray-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3.5 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none placeholder-gray-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                className="w-full px-4 py-3.5 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none cursor-pointer appearance-none"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Source</label>
              <select
                className="w-full px-4 py-3.5 bg-[#0a0a0a] border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none cursor-pointer appearance-none"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              >
                <option value="Website">Website</option>
                <option value="Instagram">Instagram</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3.5 text-sm font-medium rounded-lg text-gray-300 bg-transparent border border-gray-800 hover:bg-gray-900 hover:text-white transition-colors cursor-pointer w-full sm:w-auto text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3.5 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-600 disabled:opacity-50 transition-all cursor-pointer w-full sm:w-auto text-center"
            >
              {loading ? 'Saving...' : 'Save Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
