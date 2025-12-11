import React, { useState, useRef } from 'react';
import {
    ClipboardList,
    ChevronDown,
    Calendar,
    ArrowLeft,
    CheckSquare,
    FileText,
    MessageSquare,
    File,
    AlertTriangle,
    CheckCircle,
    LayoutGrid,
    Layout,
    User,
    DollarSign,
    ArrowRightFromLine,
    Clock,
    HelpCircle,
    Grid,
    Star,
    MoreHorizontal,
    Plus,
    ChevronRight,
    List,
    Columns,
    Search,
    Building,
    Pencil,  // Added
    Trash2,  // Added
    X        // Added
} from 'lucide-react';

// --- New Task Modal ---
const NewTaskModal = ({ isOpen, onClose, onCreate }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [duration, setDuration] = useState(1);
    const [plannedCompletionDate, setPlannedCompletionDate] = useState('Dec 8, 2025');

    if (!isOpen) return null;

    const handleCreate = () => {
        if (!taskName.trim()) return;
        const newTask = {
            id: Date.now(),
            name: taskName,
            assignments,
            duration: `${duration} Day${duration > 1 ? 's' : ''}`,
            plannedHours: '0 Hours',
            startDate: new Date().toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' }),
            dueDate: new Date(plannedCompletionDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' }) || '12/8/25',
            percentComplete: 0
        };
        onCreate(newTask);
        setTaskName('');
        setDescription('');
        setAssignments([]);
        setDuration(1);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                <div className="flex items-center space-x-3 p-6 pb-4">
                    <div className="w-10 h-10 bg-[#3B82F6] rounded flex items-center justify-center text-white shrink-0 shadow-sm">
                        <ClipboardList size={22} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Task</h2>
                </div>
                <div className="p-6 pt-0 space-y-4 overflow-y-auto flex-1">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                            Task Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="w-full border border-blue-500 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                            placeholder="Task Name"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 h-24 resize-none bg-white dark:bg-gray-700 dark:text-white"
                            placeholder="Description"
                        />
                        <div className="text-right text-[10px] text-gray-400 mt-1">0/4000</div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Assignments</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                className="flex-1 border border-gray-300 dark:border-gray-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                                placeholder="Search people, roles, or teams"
                            />
                            <button
                                onClick={() => setAssignments([{ id: 'me', name: 'Jimmie Miller', initials: 'JM', color: 'bg-emerald-600' }])}
                                className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded"
                            >
                                Assign to me
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase text-[10px]">DURATION</label>
                            <div className="flex bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                                    className="w-12 p-2 text-sm border-r border-gray-300 dark:border-gray-600 focus:outline-none text-center bg-transparent dark:text-white"
                                />
                                <div className="flex-1 flex items-center justify-between px-3 text-sm text-gray-600 dark:text-gray-300">
                                    <span>Days</span>
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 uppercase text-[10px]">PLANNED COMPLETION DATE</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={plannedCompletionDate}
                                    onChange={(e) => setPlannedCompletionDate(e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                                />
                                <Calendar size={16} className="absolute right-3 top-2.5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={handleCreate}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-sm transition-colors"
                        >
                            Create task
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm px-4 py-2"
                        >
                            Cancel
                        </button>
                    </div>
                    <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm font-medium">
                        More options
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProjectDetailView = ({ project, onBack }) => {
    const [activeTab, setActiveTab] = useState('documents'); // 'documents' | 'tasks'
    const [isAddNewOpen, setIsAddNewOpen] = useState(false);
    const [isGoogleFileOpen, setIsGoogleFileOpen] = useState(false);
    const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

    // Approval Mode State
    // 'initial' = Selection Screen
    // 'create_single' = The Form for Single Use
    // 'view_existing' = OMNICOM+ | Project Approval View
    const [approvalMode, setApprovalMode] = useState('initial');
    const [isUseExistingOpen, setIsUseExistingOpen] = useState(false);

    // --- Edit Mode State for OMNICOM+ View ---
    const [isEditing, setIsEditing] = useState(false);
    const [stageName, setStageName] = useState("Project Review");
    const [omnicomApprovers, setOmnicomApprovers] = useState([
        { id: 'ot', name: 'Omni Technical', initials: 'OT', color: 'bg-blue-700' }
    ]);
    const [isOneDecisionRequired, setIsOneDecisionRequired] = useState(false);

    const handleAddApprover = () => {
        // Mock checking if Jimmie is already added, if not add him
        if (!omnicomApprovers.find(a => a.id === 'jm')) {
            setOmnicomApprovers([...omnicomApprovers, { id: 'jm', name: 'Jimmie Miller', initials: 'JM', color: 'bg-pink-500' }]);
        }
    };

    const handleRemoveApprover = (id) => {
        setOmnicomApprovers(omnicomApprovers.filter(a => a.id !== id));
    };

    const handleSaveOmnicom = () => {
        setIsEditing(false);

        // Check if Jimmie Miller is an approver and trigger dashboard widget update
        const hasJimmie = omnicomApprovers.some(ap => ap.name === "Jimmie Miller");
        if (hasJimmie) {
            const pendingApproval = {
                id: Date.now(),
                requester: "Robert Lawrence",
                project: "Omni+ Platform Proof of Concept",
                stage: stageName,
                date: "Just now"
            };
            localStorage.setItem('omnify_pending_approvals', JSON.stringify([pendingApproval]));
        } else {
            localStorage.removeItem('omnify_pending_approvals');
        }
    };

    // --- Document Upload Logic ---
    const fileInputRef = useRef(null);

    const handleDocumentClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const newDoc = {
            id: Date.now(),
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            user: "Jimmie Miller",
            type: file.type
        };

        // Update local state (assuming project.documents is passed, but we might need local state if it's not mutable)
        // Since 'project' prop is likely immutable, we should use a local state for documents initialized from project
        // But for now, let's try to update a local list if we had one.
        // Wait, 'project' is a prop. I should probably have a local 'documents' state initialized from 'project.documents'.

        // For this specific 'Workfront-clone', the previous implementation likely relied on a local state or just mocked it.
        // I will add a local state for documents if it doesn't exist, or use 'setDocuments' if I add it.
        // Checking lines 167+, I see 'tasks' state but not 'documents'.
        // I will fix this by adding 'documents' state in the next steps if needed.
        // FOR NOW, I will use a callback or just log it, BUT the prompt says "sync to interact".

        // SYNC TO INTERACT (via cookie)
        const cookieData = JSON.stringify(newDoc);
        document.cookie = `omnify_new_document_trigger=${encodeURIComponent(cookieData)}; path=/; max-age=300`; // 5 mins

        // ALSO: We need to see it in the UI. 
        // I'll add a 'localDocuments' state in this same tool call to be safe.
        setLocalDocuments(prev => [...prev, newDoc]);
    };

    // Initialize local documents from prop
    const [localDocuments, setLocalDocuments] = useState(project?.documents || []);

    // Default project details if not provided
    const projectDetails = {
        name: project?.name || "Untitled Project",
        status: project?.status || "Planning",
        owner: project?.owner || "Jimmie Miller",
        percentComplete: project?.percentComplete || 0,
        dueDate: project?.due || "Dec 9, 2025",
        condition: "In Trouble"
    };

    const handleCreateTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleSelectExisting = (option) => {
        if (option === 'OMNICOM+') {
            setApprovalMode('view_existing');
        }
        setIsUseExistingOpen(false);
    };

    const sidebarItems = [
        { name: 'Tasks', icon: CheckSquare },
        { name: 'Project Details', icon: FileText },
        { name: 'Associated projects', icon: CheckSquare },
        { name: 'Business Case', icon: FileText },
        { name: 'Updates', icon: MessageSquare },
        { name: 'Documents', icon: File },
        { name: 'Issues (0)', icon: AlertTriangle },
        { name: 'Risks', icon: AlertTriangle },
        { name: 'Approvals', icon: CheckCircle },
        { name: 'Snapshots', icon: LayoutGrid },
        { name: 'Baselines', icon: Layout },
        { name: 'Rates', icon: FileText },
        { name: 'Resource For Billing', icon: User },
        { name: 'Billing Records', icon: FileText },
        { name: 'Expenses', icon: DollarSign },
        { name: 'Bookings', icon: ArrowRightFromLine },
        { name: 'Hours', icon: Clock },
        { name: 'Workload Balancer', icon: Calendar },
        { name: 'People', icon: User },
        { name: 'Utilization', icon: Layout },
        { name: 'Queue Details', icon: HelpCircle },
        { name: 'Routing Rules', icon: ArrowRightFromLine },
        { name: 'Queue Topics', icon: HelpCircle },
        { name: 'Topic Groups', icon: MessageSquare },
        { name: 'Metrics', icon: Layout },
        { name: 'Experience Manager', icon: ArrowRightFromLine },
        { name: 'Planning', icon: LayoutGrid },
        { name: 'Time-phased Views', icon: Calendar },
        { name: 'Hierarchy', icon: Grid },
    ];

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800">
            {/* Top Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="px-4 py-3 flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-[#7B61FF] rounded flex items-center justify-center text-white shrink-0 shadow-sm">
                            <ClipboardList size={24} />
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-wide font-semibold">
                                <span>PROJECT</span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                {projectDetails.name}
                                <Star size={18} className="text-gray-400 cursor-pointer hover:text-yellow-400" />
                                <button className="text-sm font-medium border border-gray-300 rounded-full px-3 py-0.5 hover:bg-gray-50 flex items-center gap-1 ml-2">
                                    Share
                                </button>
                                <MoreHorizontal size={16} className="text-gray-400 ml-1" />
                            </h1>
                        </div>
                    </div>

                    {/* Metrics/Status Right Side */}
                    <div className="flex items-center space-x-8 pt-1">
                        <div>
                            <div className="text-[10px] text-gray-500 mb-0.5 font-medium">Percent Complete</div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                                {projectDetails.percentComplete}%
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 mb-0.5 font-medium">Project Owner</div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden">
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${projectDetails.owner}`} alt="avatar" />
                                </div>
                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{projectDetails.owner}</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 mb-0.5 font-medium">Planned Completion Date</div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                                {projectDetails.dueDate}
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 mb-0.5 font-medium">Condition</div>
                            <div className="text-xs font-semibold flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span>{projectDetails.condition}</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 mb-0.5 font-medium">Status</div>
                            <div className="text-xs font-semibold flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span>{projectDetails.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Task Modal */}
            <NewTaskModal
                isOpen={isNewTaskModalOpen}
                onClose={() => setIsNewTaskModalOpen(false)}
                onCreate={handleCreateTask}
            />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Navigation */}
                <div className="w-[240px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto">
                    <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 mr-2">
                            <ArrowLeft size={16} />
                        </button>
                        <span className="font-semibold text-sm text-gray-700 dark:text-gray-200">Projects</span>
                    </div>
                    <div className="flex-1 py-2">
                        {sidebarItems.map((item) => {
                            const isActive = activeTab === item.name.toLowerCase() || (item.name === 'Documents' && activeTab === 'documents');
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => setActiveTab(item.name.toLowerCase())}
                                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${isActive
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white font-medium pl-3 border-l-4 border-transparent' // Standard Item Style
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 border-transparent'
                                        } ${isActive && item.name === 'Approvals' ? '!bg-blue-100 !border-l-blue-600' : ''}`}
                                >
                                    <item.icon size={16} className={isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500'} />
                                    <span>{item.name}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                        <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600">
                            <Plus size={16} className="bg-gray-200 rounded-full p-0.5" />
                            <span>Add a Dashboard</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden relative">

                    {/* --- DOCUMENTS TAB --- */}
                    {activeTab === 'documents' && (
                        <>
                            {/* Documents Toolbar */}
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsAddNewOpen(!isAddNewOpen)}
                                            className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700"
                                        >
                                            <Plus size={16} />
                                            <span>Add new</span>
                                            <ChevronDown size={14} />
                                        </button>

                                        {/* Add New Dropdown */}
                                        {isAddNewOpen && (
                                            <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-sm shadow-xl border border-gray-200 dark:border-gray-700 z-50 py-1 text-sm font-normal text-gray-800">
                                                <div className="py-1">
                                                    <button
                                                        onClick={handleDocumentClick}
                                                        className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center"
                                                    >
                                                        Document
                                                    </button>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        className="hidden"
                                                        onChange={handleFileUpload}
                                                    />
                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">Proof</button>

                                                    {/* Google File Submenu Trigger */}
                                                    <div
                                                        className="relative w-full"
                                                        onMouseEnter={() => setIsGoogleFileOpen(true)}
                                                        onMouseLeave={() => setIsGoogleFileOpen(false)}
                                                    >
                                                        <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center justify-between">
                                                            <span>Google File</span>
                                                            <ChevronRight size={14} />
                                                        </button>
                                                        {isGoogleFileOpen && (
                                                            <div className="absolute left-full top-0 w-48 bg-white dark:bg-gray-800 rounded-sm shadow-xl border border-gray-200 dark:border-gray-700 z-50 py-1">
                                                                <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50">Google Doc</button>
                                                                <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50">Google Sheet</button>
                                                                <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50">Google Slide</button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">Request a Document</button>
                                                </div>
                                                <div className="border-t border-gray-100 my-1"></div>
                                                <div className="py-1">
                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">Folder</button>
                                                </div>
                                                <div className="border-t border-gray-100 my-1"></div>
                                                <div className="py-1 text-gray-700">
                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">From AEM LeapPoint Pro...</button>
                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">From EMEA - Portfolio/P...</button>
                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">From Box</button>
                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">From Dropbox</button>
                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">From Google Drive</button>
                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">From Microsoft OneDrive</button>
                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">From SharePoint (Graph ...</button>
                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">From Workfront Proof</button>
                                                </div>
                                                <div className="border-t border-gray-100 my-1"></div>
                                                <div className="py-1">
                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">Paste from Clipboard</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 text-gray-400">
                                    <div className="flex bg-blue-50 p-1 rounded">
                                        <LayoutGrid size={18} className="text-blue-600" />
                                    </div>
                                    <List size={18} className="hover:text-gray-600 cursor-pointer" />
                                    <Columns size={18} className="hover:text-gray-600 cursor-pointer" />
                                </div>
                            </div>

                            {/* Documents Content */}
                            <div className="flex-1 flex overflow-hidden">
                                {/* Folders/Nav Pane (Collapsed/Empty usually) */}
                                <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4 bg-gray-50/50">
                                    <div className="text-xs font-bold text-gray-500 flex items-center gap-1 mb-2">
                                        <span className="text-[10px]"><ChevronDown size={10} /></span>
                                        PROJECT FOLDERS (0)
                                    </div>
                                </div>

                                {/* File List / Empty State */}
                                <div className="flex-1 p-0 flex flex-col">
                                    {localDocuments && localDocuments.length > 0 ? (
                                        <div className="flex-1 overflow-auto">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 border-b border-gray-200 dark:border-gray-700">
                                                    <tr>
                                                        <th className="px-6 py-3 font-medium">Name</th>
                                                        <th className="px-6 py-3 font-medium">Size</th>
                                                        <th className="px-6 py-3 font-medium">Date</th>
                                                        <th className="px-6 py-3 font-medium">Created By</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                                    {localDocuments.map((doc, idx) => (
                                                        <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                                                            <td className="px-6 py-3 flex items-center space-x-3">
                                                                <FileText size={18} className="text-blue-500" />
                                                                <span className="font-medium text-gray-900 dark:text-white">{doc.name}</span>
                                                            </td>
                                                            <td className="px-6 py-3 text-gray-500">{doc.size}</td>
                                                            <td className="px-6 py-3 text-gray-500">{doc.date}</td>
                                                            <td className="px-6 py-3 text-gray-500">{doc.user || "System"}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="flex-1 p-8 flex flex-col items-center justify-center text-gray-400">
                                            {/* Placeholder for "No documents" icon */}
                                            <div className="mb-4 opacity-50">
                                                <FileText size={64} strokeWidth={1} />
                                            </div>
                                            <p className="text-sm">No documents found for this project.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* --- TASKS TAB (Labeled Tasks) --- */}
                    {activeTab === 'tasks' && (
                        <div className="h-full flex flex-col">
                            {/* Task Toolbar */}
                            <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => {
                                            console.log("Add Task button clicked");
                                            setIsNewTaskModalOpen(true);
                                        }}
                                        className="flex items-center space-x-1 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors font-medium text-sm z-10"
                                    >
                                        <Plus size={16} />
                                        <span>Add Task</span>
                                        <ChevronDown size={14} />
                                    </button>
                                </div>

                                {/* Right Toolbar Items */}
                                <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                                    <Search size={18} className="cursor-pointer" />
                                    <div className="flex items-center space-x-2 border-l border-gray-300 dark:border-gray-600 pl-4">
                                        <LayoutGrid size={16} />
                                        <span>Board</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <ArrowRightFromLine size={16} className="rotate-90" />
                                        <span>Gantt</span>
                                    </div>
                                </div>
                            </div>

                            {/* Task List Header */}
                            <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-2 grid grid-cols-12 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                <div className="col-span-1 flex items-center space-x-2">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                    <span>#</span>
                                </div>
                                <div className="col-span-4">Task Name</div>
                                <div className="col-span-2">Assignments</div>
                                <div className="col-span-1">Duration</div>
                                <div className="col-span-1">Pln Hrs</div>
                                <div className="col-span-1">Predecessors</div>
                                <div className="col-span-1">Start On</div>
                                <div className="col-span-1">Due On</div>
                            </div>

                            {/* Task List Content */}
                            {tasks.length > 0 ? (
                                <div className="flex-1 overflow-y-auto">
                                    {tasks.map((task, index) => (
                                        <div key={task.id} className="grid grid-cols-12 items-center px-6 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
                                            <div className="col-span-1 flex items-center space-x-2">
                                                <span className="text-gray-500 dark:text-gray-400">{index + 1}</span>
                                            </div>
                                            <div className="col-span-4 font-medium text-blue-600 dark:text-blue-400 cursor-pointer hover:underline truncate pr-4">
                                                {task.name}
                                            </div>
                                            <div className="col-span-2 flex items-center space-x-1 overflow-hidden">
                                                {task.assignments.length > 0 ? (
                                                    task.assignments.map(a => (
                                                        <div key={a.id} className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-full pl-0.5 pr-2 py-0.5 max-w-full">
                                                            <div className={`w-5 h-5 rounded-full ${a.color} text-white flex items-center justify-center text-[9px] font-bold shrink-0`}>
                                                                {a.initials}
                                                            </div>
                                                            <span className="text-xs truncate">{a.name}</span>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400 text-xs italic">Unassigned</span>
                                                )}
                                            </div>
                                            <div className="col-span-1 text-gray-600 dark:text-gray-300">{task.duration}</div>
                                            <div className="col-span-1 text-gray-600 dark:text-gray-300">{task.plannedHours}</div>
                                            <div className="col-span-1 text-gray-400"></div>
                                            <div className="col-span-1 text-gray-600 dark:text-gray-300">{task.startDate}</div>
                                            <div className="col-span-1 text-gray-600 dark:text-gray-300">{task.dueDate}</div>
                                        </div>
                                    ))}
                                    <div className="px-6 py-3">
                                        <button
                                            onClick={() => setIsNewTaskModalOpen(true)}
                                            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center space-x-1"
                                        >
                                            <Plus size={14} />
                                            <span>Add More Tasks</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                                    <div className="w-full px-6 py-3 border-b border-gray-100 dark:border-gray-800">
                                        <button
                                            onClick={() => setIsNewTaskModalOpen(true)}
                                            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center space-x-1"
                                        >
                                            <Plus size={14} />
                                            <span>Start Adding Tasks</span>
                                        </button>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center pb-20">
                                        Tasks will show here as you add them.
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- APPROVALS TAB --- */}
                    {activeTab === 'approvals' && (
                        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 h-full overflow-y-auto">

                            {/* --- INITIAL SELECTION SCREEN --- */}
                            {approvalMode === 'initial' && (
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <div className="text-center max-w-md">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Select or create an approval process</h2>

                                        <div className="flex items-center justify-center space-x-4 mb-12 relative">
                                            {/* Use Existing Button & Dropdown */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => setIsUseExistingOpen(!isUseExistingOpen)}
                                                    className={`flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border ${isUseExistingOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300 dark:border-gray-600'} rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-w-[170px] shadow-sm`}
                                                >
                                                    <span>Use existing</span>
                                                    <ChevronDown size={14} className={`ml-2 transition-transform ${isUseExistingOpen ? 'rotate-180' : ''}`} />
                                                </button>

                                                {/* Dropdown Menu */}
                                                {isUseExistingOpen && (
                                                    <div className="absolute top-full left-0 mt-1 w-[280px] bg-white dark:bg-gray-800 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 z-50 text-left py-1 animate-in fade-in zoom-in-95 duration-100">
                                                        <button
                                                            onClick={() => handleSelectExisting('OMNICOM+')}
                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-l-4 border-blue-500 bg-blue-50/50"
                                                        >
                                                            OMNICOM+ | Project Approval
                                                        </button>
                                                        <button
                                                            onClick={() => setIsUseExistingOpen(false)}
                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 border-transparent"
                                                        >
                                                            Sponsor Approval
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => setApprovalMode('create_single')}
                                                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                                            >
                                                Create single-use
                                            </button>
                                        </div>

                                        {/* Illustration Placeholder */}
                                        <div className="relative flex justify-center">
                                            <div className="relative">
                                                <div className="absolute -left-16 top-10 transform -rotate-12 opacity-40">
                                                    <div className="bg-blue-100 p-2 rounded shadow border border-blue-200">
                                                        <FileText size={40} className="text-blue-300" />
                                                    </div>
                                                </div>
                                                <div className="absolute -right-12 top-0 transform rotate-12 opacity-40">
                                                    <div className="bg-blue-100 p-2 rounded shadow border border-blue-200">
                                                        <CheckSquare size={40} className="text-blue-300" />
                                                    </div>
                                                </div>
                                                <div className="relative z-10 flex flex-col items-center">
                                                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 mb-4">
                                                        <div className="bg-blue-600 rounded-lg p-3">
                                                            <CheckCircle size={48} className="text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 opacity-50 blur-sm"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- CREATE SINGLE-USE FORM --- */}
                            {approvalMode === 'create_single' && (
                                <div className="p-6 w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-4">
                                        <div className="flex items-center space-x-2 mb-6 cursor-pointer hover:opacity-80" onClick={() => setApprovalMode('initial')}>
                                            <ChevronDown size={20} className="text-gray-700 dark:text-gray-300" />
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Path 1</h3>
                                        </div>

                                        <div className="mb-8 max-w-xl">
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                Start approval process when the status is set to <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <select className="w-full appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                                                    <option>Select Status</option>
                                                    <option>Planning</option>
                                                    <option>In Progress</option>
                                                    <option>Complete</option>
                                                </select>
                                                <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Stage Card */}
                                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded border border-gray-200 dark:border-gray-700 mb-6 max-w-3xl">
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Stage 1</h4>

                                            <div className="mb-5">
                                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Name</label>
                                                <input
                                                    type="text"
                                                    defaultValue="Stage 1"
                                                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 text-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                                    Approvers <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Search people, roles, or teams"
                                                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 text-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline mb-8">
                                            <Plus size={16} />
                                            <span>Add stage</span>
                                        </button>

                                        <div className="max-w-xl">
                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                Choose what happens when the approval is rejected:
                                            </label>
                                            <div className="relative">
                                                <select className="w-full appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                                                    <option>Previous status</option>
                                                    <option>Reset to Planning</option>
                                                    <option>Nothing</option>
                                                </select>
                                                <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                            <button
                                                onClick={() => setApprovalMode('initial')}
                                                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-colors">
                                        <Plus size={16} />
                                        <span>Add path</span>
                                    </button>
                                </div>
                            )}

                            {/* --- VIEW EXISTING (OMNICOM+) --- */}
                            {approvalMode === 'view_existing' && (
                                <div className="p-6 w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="text-center max-w-md mx-auto mb-8">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Select or create an approval process</h2>

                                        <div className="flex items-center justify-center space-x-4">
                                            {/* Dropdown with OMNICOM+ Selected */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => setIsUseExistingOpen(!isUseExistingOpen)}
                                                    className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-2 border-transparent ring-2 ring-gray-200 dark:ring-gray-600 rounded-full text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-w-[220px] shadow-sm"
                                                >
                                                    <span>OMNICOM+ | Project Approval</span>
                                                    <ChevronDown size={14} className={`ml-2 transition-transform ${isUseExistingOpen ? 'rotate-180' : ''}`} />
                                                </button>

                                                {/* Dropdown Menu - Allowing to switch back */}
                                                {isUseExistingOpen && (
                                                    <div className="absolute top-full left-0 mt-1 w-[280px] bg-white dark:bg-gray-800 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 z-50 text-left py-1 animate-in fade-in zoom-in-95 duration-100">
                                                        <button
                                                            onClick={() => {
                                                                setApprovalMode('view_existing');
                                                                setIsUseExistingOpen(false);
                                                            }}
                                                            className="w-full text-left px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500"
                                                        >
                                                            OMNICOM+ | Project Approval
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setApprovalMode('initial');
                                                                setIsUseExistingOpen(false);
                                                            }}
                                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 border-transparent"
                                                        >
                                                            Switch to Selection...
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Path 1 Card */}
                                    <div className="bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between mb-0">
                                            <div className="flex items-center">
                                                <ChevronDown size={20} className="text-gray-700 dark:text-gray-300 mr-2" />
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Path 1</h3>
                                            </div>
                                            {/* Edit / Trash Buttons (Only show in Read-Only mode) */}
                                            {!isEditing && (
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => setIsEditing(true)}
                                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button className="text-gray-400 hover:text-red-500">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-8">
                                            {/* --- EDIT MODE CONTENT --- */}
                                            {isEditing ? (
                                                <div className="animate-in fade-in duration-300">
                                                    <div className="mb-8 max-w-xl">
                                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                            Start approval process when the status is set to <span className="text-red-500">*</span>
                                                        </label>
                                                        <div className="relative">
                                                            <select className="w-full appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                                                                <option>Requested</option>
                                                                <option>Planning</option>
                                                                <option>In Progress</option>
                                                                <option>Complete</option>
                                                            </select>
                                                            <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                                                        </div>
                                                    </div>

                                                    {/* Stage Block (Editable) */}
                                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 p-6 mb-8 max-w-3xl">
                                                        <h4 className="font-bold text-base text-gray-900 dark:text-white mb-4">Stage 1</h4>

                                                        <div className="mb-5">
                                                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">Name</label>
                                                            <input
                                                                type="text"
                                                                value={stageName}
                                                                onChange={(e) => setStageName(e.target.value)}
                                                                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 text-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            />
                                                        </div>

                                                        <div className="mb-2">
                                                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                                                                Approvers <span className="text-red-500">*</span>
                                                            </label>
                                                            <div className="relative mb-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search people, roles, or teams"
                                                                    // Mock search that adds "Jimmie Miller" on enter or click for demo
                                                                    onClick={handleAddApprover}
                                                                    readOnly // Make it effectively a "button" for this demo
                                                                    className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 text-sm bg-white dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                                                                />
                                                            </div>

                                                            {/* Approvers List */}
                                                            <div className="space-y-1">
                                                                {omnicomApprovers.map((approver) => (
                                                                    <div key={approver.id} className="flex items-center justify-between p-2 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors group">
                                                                        <div className="flex items-center space-x-2">
                                                                            <div className={`w-6 h-6 rounded-full ${approver.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                                                                                {approver.initials}
                                                                            </div>
                                                                            <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{approver.name}</span>
                                                                        </div>
                                                                        <button
                                                                            onClick={() => handleRemoveApprover(approver.id)}
                                                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                                        >
                                                                            <X size={16} />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            <div className="mt-4 flex items-center space-x-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id="oneDecision"
                                                                    checked={isOneDecisionRequired}
                                                                    onChange={(e) => setIsOneDecisionRequired(e.target.checked)}
                                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                                />
                                                                <label htmlFor="oneDecision" className="text-sm text-gray-700 dark:text-gray-300 select-none">
                                                                    Only one decision is required
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline mb-8">
                                                        <Plus size={16} />
                                                        <span>Add stage</span>
                                                    </button>

                                                    <div className="max-w-xl">
                                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                            Choose what happens when the approval is rejected:
                                                        </label>
                                                        <div className="relative">
                                                            <select className="w-full appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded p-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                                                                <option>Previous status</option>
                                                                <option>Reset to Planning</option>
                                                                <option>Nothing</option>
                                                            </select>
                                                            <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                                                        </div>
                                                    </div>

                                                </div>
                                            ) : (
                                                /* --- READ ONLY CONTENT --- */
                                                <div className="animate-in fade-in duration-300">
                                                    <div className="mb-8">
                                                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Start approval process when the status is set to</div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Requested</div>
                                                    </div>

                                                    {/* Stage Block (Read Only) */}
                                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700 p-6 mb-8 max-w-4xl">
                                                        <h4 className="font-bold text-base text-gray-900 dark:text-white mb-6">{stageName}</h4>

                                                        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                                                            <div className="grid grid-cols-12">
                                                                <div className="col-span-12 mb-2 text-xs font-semibold text-gray-500 uppercase">Approvers</div>
                                                                {omnicomApprovers.map((approver) => (
                                                                    <div key={approver.id} className="col-span-12 flex items-center mb-1">
                                                                        <div className={`w-6 h-6 rounded-full ${approver.color} flex items-center justify-center text-white text-[10px] font-bold mr-2`}>
                                                                            {approver.initials}
                                                                        </div>
                                                                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{approver.name}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">If rejected</div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Previous status</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Footer Buttons - Dynamic based on Edit Mode */}
                                    <div className="mt-8 flex items-center space-x-4">
                                        <button
                                            onClick={handleSaveOmnicom} // Save persists changes and updates dashboard
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-6 rounded-full text-sm transition-colors"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (isEditing) {
                                                    setIsEditing(false); // Cancel Edit
                                                } else {
                                                    setApprovalMode('initial'); // Cancel View
                                                }
                                            }}
                                            className="text-gray-700 dark:text-gray-300 font-medium text-sm hover:underline"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailView;
