// Função para mostrar modal PIX
function showPixInfo() {
    document.getElementById('pixModal').style.display = 'block';
}

// Função para fechar modal PIX
function closePixModal() {
    document.getElementById('pixModal').style.display = 'none';
}

// Função para copiar chave PIX
function copyPix() {
    const pixKey = '38598747000166';
    
    // Tentar usar a API moderna de clipboard
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pixKey).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopyTextToClipboard(pixKey);
        });
    } else {
        // Fallback para navegadores mais antigos
        fallbackCopyTextToClipboard(pixKey);
    }
}

// Função fallback para copiar texto
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Evitar scroll para o topo da página no iOS
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        console.error('Erro ao copiar texto: ', err);
        alert('Não foi possível copiar automaticamente. Chave PIX: ' + text);
    }
    
    document.body.removeChild(textArea);
}

// Função para mostrar feedback de cópia bem-sucedida
function showCopySuccess() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.innerHTML;
    
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
    copyBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = 'linear-gradient(135deg, #32BCAD, #00A693)';
    }, 2000);
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('pixModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Adicionar animações aos botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach((button, index) => {
        button.style.animationDelay = `${index * 0.1}s`;
        button.classList.add('fade-in');
    });
});

// CSS para animação fade-in (adicionado via JavaScript)
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
        opacity: 0;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Adicionar efeito de vibração no mobile ao tocar nos botões
if ('vibrate' in navigator) {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('touchstart', () => {
            navigator.vibrate(50);
        });
    });
}

