import { Request, Response } from 'express';
import Lead from '../models/Lead';

// Create a Lead
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, status, source } = req.body;
    
    if (!name || !email || !source) {
      res.status(400).json({ success: false, message: 'Please provide name, email, and source' });
      return;
    }

    const lead = await Lead.create({ name, email, status, source });
    res.status(201).json({ success: true, data: lead });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

// Get all leads with Search, Filter, Sort, and Pagination
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = '1', search, status, source, sort = 'latest' } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limit = 10;
    const skip = (pageNum - 1) * limit;

    // Build Query
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    // Determine Sorting
    const sortOptions: any = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };

    // Execute Query with Pagination
    const leads = await Lead.find(query).sort(sortOptions).skip(skip).limit(limit);
    const totalCount = await Lead.countDocuments(query);

    res.json({
      success: true,
      data: leads,
      pagination: {
        totalCount,
        currentPage: pageNum,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

// Get single lead
export const getLeadById = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }
    res.json({ success: true, data: lead });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update lead
export const updateLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }

    res.json({ success: true, data: lead });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server Error' });
  }
};

// Delete lead
export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    
    if (!lead) {
      res.status(404).json({ success: false, message: 'Lead not found' });
      return;
    }

    res.json({ success: true, message: 'Lead removed' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Export leads to CSV
export const exportLeadsCSV = async (req: Request, res: Response): Promise<void> => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });

    const csvHeader = 'Name,Email,Status,Source,CreatedAt\n';
    const csvRows = leads.map(lead => {
      // Escape commas in strings to prevent CSV format issues
      const name = `"${lead.name.replace(/"/g, '""')}"`;
      const email = `"${lead.email.replace(/"/g, '""')}"`;
      const date = lead.createdAt.toISOString();
      return `${name},${email},${lead.status},${lead.source},${date}`;
    }).join('\n');

    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    res.send(csvHeader + csvRows);
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error during CSV export' });
  }
};
