import React, { useState } from 'react';
import {
    ArrowLeft,
    Search,
    Settings,
    Bell,
    Grid,
    User,
    MessageSquare,
    HelpCircle,
    Home,
    Layout,
    ChevronRight,
    Pin,
    MoreHorizontal,
    Filter,
    Columns,
    List,
    ArrowUpDown,
    Plus,
    FileText,
    CheckCircle2,
    Check,
    Star,
    Maximize,
    PanelRight,
    MessageCircle,
    Moon,
    Sun,
    X,
    ClipboardList,
    Calendar,
    DollarSign,
    AlertTriangle,
    CheckSquare,
    CheckCircle,
    Clock,
    ArrowRightFromLine,
    LayoutGrid,
    Eye,
    ChevronDown,
    File,
    FolderPlus,
    Image,
    UploadCloud,
    Box as BoxIcon,
    Globe
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

    const sidebarItems = [
        { name: 'Updates', icon: MessageSquare },
        { name: 'Documents', icon: FileText },
        { name: 'Task Details', icon: CheckSquare }, // Renamed from Tasks and logic updated
        { name: 'Subtasks', icon: CheckSquare },
        { name: 'Issues (0)', icon: AlertTriangle },
        { name: 'Hours', icon: Clock },
        { name: 'Approvals', icon: CheckCircle },
        { name: 'Expenses', icon: DollarSign },
        { name: 'Bookings', icon: ArrowRightFromLine },
        { name: 'Business Case', icon: FileText },
        { name: 'Risks', icon: AlertTriangle },
        { name: 'Baselines', icon: Layout },
        { name: 'Rates', icon: DollarSign },
        { name: 'Resource For Billing', icon: User },
        { name: 'Billing Records', icon: FileText },
        { name: 'Workload Balancer', icon: Grid },
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
                <div className="w-[220px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col py-2 overflow-y-auto">
                    <button
                        onClick={onBack}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:text-gray-900 mb-2"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm">Documents</span>
                    </button>
                    <div className="space-y-0.5">
                        {sidebarItems.map((item) => {
                            const isActive = activeTab === item.name.toLowerCase() || (item.name === 'Documents' && activeTab === 'documents');
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => setActiveTab(item.name.toLowerCase())}
                                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4 transition-colors ${isActive
                                        ? 'border-gray-800 bg-blue-50/50 text-gray-900 font-bold'
                                        : 'border-transparent text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <item.icon size={16} className={isActive ? 'text-gray-900' : 'text-gray-500'} />
                                    <span>{item.name}</span>
                                </button>
                            );
                        })}
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
                                                    <button className="w-full text-left px-4 py-1.5 hover:bg-blue-50 flex items-center">Document</button>
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
                                <div className="flex-1 p-8 flex flex-col items-center justify-center text-gray-400">
                                    {/* Placeholder for "No documents" icon */}
                                    <div className="mb-4 opacity-50">
                                        <FileText size={64} strokeWidth={1} />
                                    </div>
                                    <p className="text-sm">No documents found for this project.</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* --- TASKS TAB (Labeled Task Details) --- */}
                    {activeTab === 'task details' && (
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
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailView;
