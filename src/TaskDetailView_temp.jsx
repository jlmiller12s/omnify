// --- Task Detail View ---

const TaskDetailView = ({ task, onBack }) => {
    const [activeTab, setActiveTab] = useState('updates'); // 'updates' | 'documents' | 'details' etc

    // Mock data for the view if task props are missing details
    const taskDetails = {
        ...task,
        percentComplete: task?.percentComplete || 0,
        status: 'New',
        plannedCompletionDate: task?.dueDate || 'Dec 8, 2025',
        assignments: task?.assignments || []
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800">
            {/* Top Breadcrumb & Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                {/* Breadcrumbs */}
                <div className="px-5 py-2 text-xs text-gray-500 flex items-center space-x-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="uppercase tracking-wider">PROJECT</span>
                    <span className="text-gray-900 dark:text-gray-300">Untitled Project</span>
                    <span className="text-gray-300">|</span>
                    <span className="uppercase tracking-wider">TASK</span>
                    <span className="text-gray-900 dark:text-gray-300">{taskDetails.name}</span>
                </div>

                {/* Main Header */}
                <div className="px-6 py-4 flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">TASK</div>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                {taskDetails.name}
                                <Star size={18} className="text-gray-400 cursor-pointer hover:text-yellow-400" />
                                <button className="text-sm font-medium border border-gray-300 rounded-full px-3 py-0.5 hover:bg-gray-50 flex items-center gap-1">
                                    Share
                                </button>
                                <MoreHorizontal size={16} className="text-gray-400" />
                            </h1>
                        </div>
                    </div>

                    {/* Metrics/Status Right Side */}
                    <div className="flex items-center space-x-8">
                        <div>
                            <div className="text-[10px] text-gray-500 mb-1">Percent Complete</div>
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {taskDetails.percentComplete}%
                                </div>
                                <div className="w-24 h-1 bg-gray-200 rounded-full">
                                    <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${taskDetails.percentComplete}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="text-[10px] text-gray-500 mb-1">Assignments</div>
                            <div className="flex items-center gap-2">
                                {taskDetails.assignments.length > 0 ? (
                                    taskDetails.assignments.map(a => (
                                        <div key={a.id} className={`w-6 h-6 rounded-full ${a.color} text-white flex items-center justify-center text-[10px] font-bold`}>
                                            {a.initials}
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                                        <User size={12} />
                                    </div>
                                )}
                                <button className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                                    Work on it
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="text-[10px] text-gray-500 mb-1">Planned Completion Date</div>
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                {taskDetails.plannedCompletionDate}
                            </div>
                        </div>

                        <div>
                            <div className="text-[10px] text-gray-500 mb-1">Status</div>
                            <button className="text-sm font-medium flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                {taskDetails.status}
                                <ChevronDown size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Navigation */}
                <div className="w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col py-2">
                    <button
                        onClick={onBack}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-500 hover:text-gray-900 mb-2"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm">Updates</span>
                    </button>
                    <div className="space-y-0.5">
                        {['Updates', 'Documents', 'Task Details', 'Subtasks', 'Issues (0)', 'Hours', 'Approvals', 'Expenses', 'Bookings'].map(item => (
                            <button
                                key={item}
                                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium border-l-4 ${activeTab === item.toLowerCase() || (item === 'Updates' && activeTab === 'updates') ? 'border-gray-800 bg-gray-100 text-gray-900' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                            >
                                {item === 'Updates' && <MessageSquare size={16} />}
                                {item === 'Documents' && <FileText size={16} />}
                                {item === 'Task Details' && <List size={16} />}
                                {item === 'Subtasks' && <CheckCircle2 size={16} />}
                                {item.includes('Issues') && <AlertTriangle size={16} />}
                                {item === 'Hours' && <Clock size={16} />}
                                {item === 'Approvals' && <CheckCircle2 size={16} />}
                                {item === 'Expenses' && <DollarSign size={16} />}
                                {item === 'Bookings' && <ArrowRightFromLine size={16} />}

                                <span>{item}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content - Updates Tab */}
                <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-y-auto">
                    <div className="px-8 py-6 max-w-5xl mx-auto w-full">

                        {/* Tab Headers */}
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 mb-6">
                            <div className="flex items-center space-x-6">
                                <button className="pb-3 border-b-2 border-gray-900 font-bold text-gray-900 text-sm">Comments</button>
                                <button className="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 text-sm">System activity</button>
                                <button className="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 text-sm">All (read-only)</button>
                            </div>
                            <div className="flex items-center space-x-3 pb-2">
                                <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-bold hover:shadow-md transition-shadow">
                                    <Star size={12} className="fill-current" />
                                    <span>Summarize comments...</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-500 text-xs">
                                    <Clock size={14} />
                                    <span>Log Time</span>
                                </button>
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-2 text-gray-400" />
                                    <input type="text" className="pl-8 pr-3 py-1 border border-gray-300 rounded text-sm w-40" />
                                </div>
                            </div>
                        </div>

                        {/* New Comment Input */}
                        <div className="mb-10">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                                    <User size={16} className="text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-gray-500 mb-1 ml-1">New comment</div>
                                    <div className="border border-gray-300 rounded shadow-sm bg-white overflow-hidden">
                                        <input type="text" className="w-full px-4 py-3 text-sm focus:outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Empty State Illustration */}
                        <div className="flex flex-col items-center justify-center py-10 opacity-60">
                            <div className="relative w-32 h-32 mb-4">
                                <MessageSquare size={64} className="text-gray-200 absolute top-0 left-0" />
                                <MessageSquare size={48} className="text-gray-300 absolute bottom-0 right-0 transform -scale-x-100" />
                                <X size={24} className="text-gray-300 absolute top-4 right-8" />
                                <Plus size={20} className="text-gray-300 absolute bottom-8 left-4" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">No comments yet</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
