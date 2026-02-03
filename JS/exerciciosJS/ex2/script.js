// Aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - iniciando galeria');

    // Todo o código da galeria será colocado aqui
    inicializarGaleria();
});

function inicializarGaleria() {
    // Selecionar elementos principais
    const imagemPrincipal = document.querySelector('#imagemPrincipal');
    const miniaturasContainer = document.querySelector('#miniaturasContainer');
    const tituloImagem = document.querySelector('#tituloImagem');
    const descricaoImagem = document.querySelector('#descricaoImagem');
    const autorImagem = document.querySelector('#autorImagem');
    const loading = document.querySelector('#loading');

    // Verificar se todos os elementos foram encontrados
    if (!imagemPrincipal || !miniaturasContainer) {
        console.error('Elementos essenciais não encontrados!');
        return;
    }

    console.log('Elementos selecionados com sucesso');
}

// Dados das imagens da galeria
const imagensGaleria = [ //struct list
    {
        id: 1,
        src: 'imagens/imagem2.jpg',
        thumbnail: 'imagens/thumb/imagem2.jpg',
        titulo: 'Montanhas ao Pôr do Sol',
        descricao: 'Uma vista deslumbrante das montanhas durante o pôr do sol, com cores quentes pintando o céu.',
        autor: 'João Silva'
    },
    {
        id: 2,
        src: 'imagens/imagem3.jpg',
        thumbnail: 'imagens/thumb/imagem3.jpg',
        titulo: 'Lago Sereno',
        descricao: 'Um lago tranquilo refletindo as nuvens do céu numa manhã calma de primavera.',
        autor: 'Maria Santos'
    },
    {
        id: 3,
        src: 'imagens/imagem4.jpg',
        thumbnail: 'imagens/thumb/imagem4.jpg',
        titulo: 'Floresta Encantada',
        descricao: 'Uma floresta densa com raios de sol filtrando através das copas das árvores.',
        autor: 'Pedro Costa'
    },
    {
        id: 4,
        src: 'imagens/imagem5.jpg',
        thumbnail: 'imagens/thumb/imagem5.jpg',
        titulo: 'Praia Tropical',
        descricao: 'Uma praia paradisíaca com águas cristalinas e areia branca sob um céu azul.',
        autor: 'Ana Ferreira'
    }
];

function criarMiniaturas() {
    console.log('Criando miniaturas...');

    // Limpar container de miniaturas
    miniaturasContainer.innerHTML = '';

    // Criar miniatura para cada imagem
    imagensGaleria.forEach((imagem, index) => {
        // Criar elemento img para a miniatura
        const miniatura = document.createElement('img');
        miniatura.src = imagem.thumbnail;
        miniatura.alt = imagem.titulo;
        miniatura.className = 'miniatura';
        miniatura.dataset.index = index;

        // Marcar primeira miniatura como ativa
        if (index === 0) {
            miniatura.classList.add('ativa');
        }

        // Adicionar event listener para clique
        miniatura.addEventListener('click', function() {
            trocarImagem(index);
        });

        // Adicionar miniatura ao container
        miniaturasContainer.appendChild(miniatura);
    });

    console.log(`${imagensGaleria.length} miniaturas criadas`);
}

function trocarImagem(index) {
    console.log(`Trocando para imagem ${index + 1}`);

    // Verificar se o índice é válido
    if (index < 0 || index >= imagensGaleria.length) {
        console.error('Índice de imagem inválido:', index);
        return;
    }

    const imagemSelecionada = imagensGaleria[index];

    // Mostrar indicador de carregamento
    loading.style.display = 'block';
    imagemPrincipal.style.opacity = '0.5';

    // Simular carregamento (em aplicação real, seria o carregamento da imagem)
    setTimeout(() => {
        // Atualizar imagem principal
        imagemPrincipal.src = imagemSelecionada.src;
        imagemPrincipal.alt = imagemSelecionada.titulo;

        // Atualizar informações
        tituloImagem.textContent = imagemSelecionada.titulo;
        descricaoImagem.textContent = imagemSelecionada.descricao;
        autorImagem.textContent = `Autor: ${imagemSelecionada.autor}`;

        // Atualizar miniatura ativa
        atualizarMiniaturaAtiva(index);

        // Esconder indicador de carregamento
        loading.style.display = 'none';
        imagemPrincipal.style.opacity = '1';

        console.log(`Imagem trocada para: ${imagemSelecionada.titulo}`);
    }, 300);
}

function adicionarEventListeners() {
    console.log('Adicionando event listeners...');

    // Event listener para miniaturas (já implementado na função criarMiniaturas)
    // Aqui podemos adicionar event listeners adicionais

    // Event listener para navegação por teclado
    document.addEventListener('keydown', function(event) {
        navegarPorTeclado(event);
    });

    // Event listener para redimensionamento da janela
    window.addEventListener('resize', function() {
        ajustarLayout();
    });

    console.log('Event listeners adicionados');
}

let imagemAtualIndex = 0;

function navegarPorTeclado(event) {
    // Verificar se as setas foram pressionadas
    if (event.key === 'ArrowLeft') {
        // Navegar para imagem anterior
        const novoIndex = imagemAtualIndex > 0 ? imagemAtualIndex - 1 : imagensGaleria.length - 1;
        trocarImagem(novoIndex);
        event.preventDefault(); // Prevenir scroll da página
    } else if (event.key === 'ArrowRight') {
        // Navegar para próxima imagem
        const novoIndex = imagemAtualIndex < imagensGaleria.length - 1 ? imagemAtualIndex + 1 : 0;
        trocarImagem(novoIndex);
        event.preventDefault();
    } else if (event.key === 'Escape') {
        // Voltar à primeira imagem
        trocarImagem(0);
    }
}

function atualizarMiniaturaAtiva(index) {
    // Remover classe ativa de todas as miniaturas
    const todasMiniaturas = document.querySelectorAll('.miniatura');
    todasMiniaturas.forEach(miniatura => {
        miniatura.classList.remove('ativa');
    });

    // Adicionar classe ativa à miniatura selecionada
    const miniaturaAtiva = document.querySelector(`[data-index="${index}"]`);
    if (miniaturaAtiva) {
        miniaturaAtiva.classList.add('ativa');
    }

    // Atualizar índice global
    imagemAtualIndex = index;
}

function carregarImagem(src, callback) {
    const img = new Image();

    img.onload = function() {
        console.log('Imagem carregada com sucesso:', src);
        callback(null, img);
    };

    img.onerror = function() {
        console.error('Erro ao carregar imagem:', src);
        callback('Erro ao carregar imagem', null);
    };

    img.src = src;
}

function trocarImagemComValidacao(index) {
    const imagemSelecionada = imagensGaleria[index];

    carregarImagem(imagemSelecionada.src, function(erro, img) {
        if (erro) {
            alert('Erro ao carregar a imagem. Tenta novamente.');
            return;
        }

        // Proceder com a troca de imagem
        trocarImagem(index);
    });
}

function toggleEcraCompleto() {
    const imagemPrincipal = document.querySelector('#imagemPrincipal');

    if (!document.fullscreenElement) {
        imagemPrincipal.requestFullscreen().catch(err => {
            console.error('Erro ao entrar em ecrã completo:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Adicionar botão de ecrã completo
function adicionarBotaoEcraCompleto() {
    const areaImagem = document.querySelector('.area-imagem');
    const botao = document.createElement('button');
    botao.textContent = '⛶ Ecrã Completo';
    botao.className = 'botao-ecra-completo';
    botao.addEventListener('click', toggleEcraCompleto);
    areaImagem.appendChild(botao);
}

function inicializarGaleria() {
    console.log('Inicializando galeria de imagens...');

    try {
        // Verificar se os elementos essenciais existem
        if (!imagemPrincipal || !miniaturasContainer) {
            throw new Error('Elementos essenciais não encontrados');
        }

        // Criar miniaturas
        criarMiniaturas();

        // Carregar primeira imagem
        trocarImagem(0);

        // Adicionar event listeners
        adicionarEventListeners();

        // Adicionar funcionalidades extras
        adicionarBotaoEcraCompleto();

        console.log('Galeria inicializada com sucesso!');

    } catch (erro) {
        console.error('Erro ao inicializar galeria:', erro);
        alert('Erro ao carregar a galeria. Recarrega a página.');
    }
}