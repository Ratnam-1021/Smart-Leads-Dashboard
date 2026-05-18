import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';
import useDebounce from '../hooks/useDebounce';
import { Download, Search, Trash2, Edit2, LogOut, ChevronLeft, ChevronRight, User as UserIcon, Plus } from 'lucide-react';
import LeadFormModal from '../components/LeadFormModal';

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  // Filtering & Pagination state
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: page.toString(), sort: 'latest' });
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (status) params.append('status', status);
      if (source) params.append('source', source);

      const { data } = await api.get(`/leads?${params.toString()}`);
      if (data.success) {
        setLeads(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalCount(data.pagination.totalCount);
      }
    } catch (err: any) {
      setError('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, [page, debouncedSearch, status, source]);
  useEffect(() => { setPage(1); }, [debouncedSearch, status, source]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await api.delete(`/leads/${id}`);
      fetchLeads();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete lead');
    }
  };

  const openAddModal = () => { setEditingLead(null); setIsModalOpen(true); };
  const openEditModal = (lead: Lead) => { setEditingLead(lead); setIsModalOpen(true); };

  const handleExportCSV = async () => {
    try {
      const response = await api.get('/leads/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leads.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Failed to export CSV');
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'Contacted': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Qualified': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'Lost': return 'bg-red-500/10 text-red-400 border border-red-500/20';
      default: return 'bg-white/5 text-gray-400 border border-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 starry-bg pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#030712]/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center glow-blue">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <h1 className="text-xl font-bold text-white tracking-wide">GigFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center text-sm text-gray-300 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                <UserIcon className="h-4 w-4 mr-2 text-blue-400" />
                <span className="font-medium mr-2">{user?.name}</span>
                <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">{user?.role}</span>
              </div>
              
              <button onClick={logout} className="p-2 sm:px-4 sm:py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex items-center border border-transparent hover:border-white/10">
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Leads Dashboard</h2>
            <p className="text-gray-400 mt-1 text-sm">Automate, analyze, and grow your business faster.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center px-4 py-2.5 bg-white/5 border border-white/10 text-sm font-medium rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </button>
            <button
              onClick={openAddModal}
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-sm font-medium rounded-xl text-white transition-all cursor-pointer glow-blue"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Lead
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center text-sm font-medium">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-[#0a0f1c]/80 backdrop-blur-xl p-2 rounded-2xl border border-white/10 mb-8 flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 bg-black/50 border border-transparent rounded-xl text-white placeholder-gray-500 focus:ring-1 focus:ring-blue-500 focus:bg-black transition-all text-sm outline-none"
              placeholder="Search leads by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-1 md:flex-none">
            <select
              className="w-full md:w-40 px-4 py-3 bg-black/50 border border-transparent rounded-xl text-gray-300 focus:ring-1 focus:ring-blue-500 focus:bg-black transition-all text-sm cursor-pointer outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>

            <select
              className="w-full md:w-40 px-4 py-3 bg-black/50 border border-transparent rounded-xl text-gray-300 focus:ring-1 focus:ring-blue-500 focus:bg-black transition-all text-sm cursor-pointer outline-none"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <option value="">All Sources</option>
              <option value="Website">Website</option>
              <option value="Instagram">Instagram</option>
              <option value="Referral">Referral</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#0a0f1c]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-white/[0.02]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                  {user?.role === 'Admin' && (
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-16 text-center text-sm text-gray-500">Loading pipeline...</td></tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-24 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Search className="h-12 w-12 mb-4 opacity-20" />
                        <p className="text-sm">No leads found. Time to grow your business.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm mr-4">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{lead.name}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{lead.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-[11px] uppercase tracking-wider font-bold rounded-full ${getStatusStyle(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300">{lead.source}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-400">{new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </td>
                      {user?.role === 'Admin' && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEditModal(lead)} className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-blue-500/20">
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDelete(lead._id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-500/20">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white/[0.02] px-6 py-4 border-t border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">
                Showing <span className="font-semibold text-gray-200">{totalCount}</span> results
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-white/10 bg-black/50 text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center px-4 py-1 rounded-lg bg-black/50 border border-white/10 text-xs font-medium text-gray-300">
                {page} / {totalPages || 1}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 rounded-lg border border-white/10 bg-black/50 text-gray-400 hover:text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={fetchLeads} initialData={editingLead} />
    </div>
  );
}
