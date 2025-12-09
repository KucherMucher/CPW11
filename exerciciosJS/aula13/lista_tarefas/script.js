//2.1 --------------------------------------------------------------

// Variáveis globais
let tasks = [];
let taskIdCounter = 1;
let currentFilter = 'all';

// Elementos do DOM
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const tasksContainer = document.getElementById('tasks-container');
const emptyState = document.getElementById('empty-state');
const filterButtons = document.querySelectorAll('.filter-btn');
const totalTasksElement = document.getElementById('total-tasks');
const completedTasksElement = document.getElementById('completed-tasks');
const pendingTasksElement = document.getElementById('pending-tasks');

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeApp);
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', handleKeyPress);
filterButtons.forEach(button => {
    button.addEventListener('click', handleFilterChange);
});

// Função de inicialização
/*function initializeApp() {
    console.log('Aplicação inicializada');
    updateDisplay();
    taskInput.focus();
}*/

//2.2 --------------------------------------------------------------

function addTask() {
    const taskText = taskInput.value.trim(); //qol

    // Validação
    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
        taskInput.focus();
        return;
    }

    if (taskText.length > 100) {
        alert('A tarefa não pode ter mais de 100 caracteres!');
        return;
    }

    // Criar objeto da tarefa
    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date()
    };

    // Adicionar à lista
    tasks.push(task);

    // Limpar input
    taskInput.value = '';

    // Atualizar display
    updateDisplay();

    // Focar no input para próxima tarefa
    taskInput.focus();

    console.log('Tarefa adicionada:', task);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

// 2.3 --------------------------------------------------------------

function renderTasks() {
    // Limpar container
    tasksContainer.innerHTML = '';

    // Filtrar tarefas
    const filteredTasks = getFilteredTasks();

    // Verificar se há tarefas
    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        return;
    } else {
        emptyState.classList.remove('show');
    }

    // Renderizar cada tarefa
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        tasksContainer.appendChild(taskElement);
    });
}

function createTaskElement(task) {
    // Criar elemento principal
    const taskItem = document.createElement('div');
    taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskItem.dataset.taskId = task.id;

    // Criar conteúdo da tarefa
    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    // Texto da tarefa
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;

    // Adicionar ao conteúdo
    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskText);

    // Criar ações
    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';

    // Botão editar
    const editButton = document.createElement('button');
    editButton.className = 'task-btn edit';
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.title = 'Editar tarefa';
    editButton.addEventListener('click', () => editTask(task.id));

    // Botão remover
    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-btn delete';
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.title = 'Remover tarefa';
    deleteButton.addEventListener('click', () => removeTask(task.id));

    // Adicionar às ações
    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    // Montar elemento completo
    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskActions);

    taskText.addEventListener('dblclick', () => enableInlineEdit(task.id));

    taskItem.draggable = true;
    taskItem.addEventListener('dragstart', handleDragStart);
    taskItem.addEventListener('dragover', handleDragOver);
    taskItem.addEventListener('drop', handleDrop);
    taskItem.addEventListener('dragend', handleDragEnd);

    return taskItem;
}

//2.4 --------------------------------------------------------------

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        updateDisplay();
        console.log(`Tarefa ${taskId} ${task.completed ? 'concluída' : 'reaberta'}`);
    }
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newText = prompt('Editar tarefa:', task.text);
    if (newText !== null && newText.trim() !== '') {
        const trimmedText = newText.trim();
        if (trimmedText.length > 100) {
            alert('A tarefa não pode ter mais de 100 caracteres!');
            return;
        }

        task.text = trimmedText;
        updateDisplay();
        console.log(`Tarefa ${taskId} editada para: ${trimmedText}`);
    }
}

function removeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (confirm(`Tem certeza que deseja remover "${task.text}"?`)) {
        // Encontrar elemento no DOM
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);

        if (taskElement) {
            // Adicionar animação de remoção
            taskElement.classList.add('removing');

            // Remover após animação
            setTimeout(() => {
                // Remover da lista
                tasks = tasks.filter(t => t.id !== taskId);
                updateDisplay();
                console.log(`Tarefa ${taskId} removida`);
            }, 300);
        }
    }
}

//2.5 --------------------------------------------------------------

function handleFilterChange(event) {
    // Remover classe active de todos os botões
    filterButtons.forEach(btn => btn.classList.remove('active'));

    // Adicionar classe active ao botão clicado
    event.target.classList.add('active');

    // Atualizar filtro atual
    currentFilter = event.target.dataset.filter;

    // Atualizar display
    updateDisplay();

    console.log(`Filtro alterado para: ${currentFilter}`);
}

function getFilteredTasks() {
    switch (currentFilter) {
        case 'completed':
            return tasks.filter(task => task.completed);
        case 'pending':
            return tasks.filter(task => !task.completed);
        case 'all':
        default:
            return tasks;
    }
}

// 2.6 --------------------------------------------------------------

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    // Atualizar elementos do DOM
    totalTasksElement.textContent = total;
    completedTasksElement.textContent = completed;
    pendingTasksElement.textContent = pending;

    console.log(`Estatísticas: ${total} total, ${completed} concluídas, ${pending} pendentes`);
}

/*function updateDisplay() {
    renderTasks();
    updateStats();
}*/

// 3.1 --------------------------------------------------------------

// Adicionar no início do ficheiro
function loadTasks() {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        // Atualizar contador para evitar IDs duplicados
        taskIdCounter = Math.max(...tasks.map(t => t.id), 0) + 1;
    }
}

function saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Modificar função updateDisplay
function updateDisplay() {
    renderTasks();
    updateStats();
    saveTasks(); // Guardar sempre que houver mudanças
}

// Modificar função initializeApp
function initializeApp() {
    loadTasks(); // Carregar tarefas guardadas
    console.log('Aplicação inicializada');
    updateDisplay();
    taskInput.focus();
}

// 3.2 --------------------------------------------------------------

function enableInlineEdit(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    const taskTextElement = taskElement.querySelector('.task-text');

    // Criar input de edição
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = task.text;
    editInput.className = 'edit-input';
    editInput.style.cssText = `
        border: 2px solid #667eea;
        border-radius: 6px;
        padding: 5px 10px;
        font-size: 16px;
        width: 100%;
        outline: none;
    `;

    // Substituir texto por input
    taskTextElement.replaceWith(editInput);
    editInput.focus();
    editInput.select();

    // Função para salvar
    function saveEdit() {
        const newText = editInput.value.trim();
        if (newText && newText !== task.text) {
            task.text = newText;
            updateDisplay();
        } else {
            // Cancelar edição
            editInput.replaceWith(taskTextElement);
        }
    }

    // Event listeners
    editInput.addEventListener('blur', saveEdit);
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            editInput.replaceWith(taskTextElement);
        }
    });
}

// Modificar createTaskElement para adicionar duplo clique
/*function createTaskElement(task) {
    // ... código existente ...

    // Adicionar evento de duplo clique no texto
    taskText.addEventListener('dblclick', () => enableInlineEdit(task.id));

    // ... resto do código ...
}*/

//3.3 --------------------------------------------------------------

// Adicionar no createTaskElement
/*function createTaskElement(task) {
    // ... código existente ...

    // Tornar elemento arrastável
    taskItem.draggable = true;
    taskItem.addEventListener('dragstart', handleDragStart);
    taskItem.addEventListener('dragover', handleDragOver);
    taskItem.addEventListener('drop', handleDrop);
    taskItem.addEventListener('dragend', handleDragEnd);

    // ... resto do código ...
}*/

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.style.opacity = '0.5';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    if (this !== draggedElement) {
        // Trocar posições no array
        const draggedId = parseInt(draggedElement.dataset.taskId);
        const targetId = parseInt(this.dataset.taskId);

        const draggedIndex = tasks.findIndex(t => t.id === draggedId);
        const targetIndex = tasks.findIndex(t => t.id === targetId);

        // Trocar elementos
        [tasks[draggedIndex], tasks[targetIndex]] = [tasks[targetIndex], tasks[draggedIndex]];

        updateDisplay();
    }
}

function handleDragEnd(e) {
    this.style.opacity = '1';
    draggedElement = null;
}