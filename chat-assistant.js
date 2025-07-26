// chat-assistant.js
class ChatAssistant {
    constructor() {
        this.isOpen = false;
        this.chatWindow = null;
        this.messages = [];
        this.initialize();
    }

    initialize() {
        // Create chat bubble
        this.createChatBubble();

        // Preload some sample responses
        this.sampleResponses = {
            "hello": "Hello! How can I help you today? 😊",
            "hi": "Hi there! What can I do for you?",
            "courses": "We offer courses in Web Development, Data Science, Mobile Development and more. Would you like me to show you our popular courses?",
            "contact": "You can contact us at info@U1Technology.com or call +91 99523 91994",
            "thanks": "You're welcome! Is there anything else I can help with?",
            "default": "I'm sorry, I didn't understand that. Could you please rephrase your question? You can also try asking about our courses, instructors, or contact information."
        };
    }

    createChatBubble() {
        this.chatBubble = document.createElement('div');
        this.chatBubble.className = 'chat-bubble';
        this.chatBubble.innerHTML = `
      <button class="chat-button">
        <i class="fas fa-comment-dots"></i>
        <span class="notification-badge"></span>
      </button>
    `;
        document.body.appendChild(this.chatBubble);

        this.chatButton = this.chatBubble.querySelector('.chat-button');
        this.notificationBadge = this.chatBubble.querySelector('.notification-badge');

        this.chatButton.addEventListener('click', () => this.toggleChat());

        // Add some basic styles
        this.addStyles();

        // Show welcome message after a delay
        setTimeout(() => {
            this.showNotification();
        }, 15000);
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .chat-bubble {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
      }
      
      .chat-button {
        background-color: #800020;
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border: none;
        outline: none;
        transition: all 0.3s ease;
        position: relative;
      }
      
      .chat-button:hover {
        background-color: #600018;
        transform: scale(1.1);
      }
      
      .chat-button i {
        font-size: 1.5rem;
      }
      
      .notification-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: #DC143C;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
        font-weight: bold;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .chat-window {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 350px;
        max-height: 500px;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
        overflow: hidden;
      }
      
      .chat-window.open {
        transform: translateY(0);
        opacity: 1;
      }
      
      .chat-header {
        background-color: #800020;
        color: white;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .chat-title {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
      }
      
      .close-chat {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 5px;
      }
      
      .chat-messages {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        background-color: #f9f9f9;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .message {
        max-width: 80%;
        padding: 10px 15px;
        border-radius: 18px;
        font-size: 0.95rem;
        line-height: 1.4;
      }
      
      .bot-message {
        align-self: flex-start;
        background-color: white;
        border: 1px solid #e5e5ea;
        color: #333;
        border-radius: 18px 18px 18px 4px;
      }
      
      .user-message {
        align-self: flex-end;
        background-color: #800020;
        color: white;
        border-radius: 18px 18px 4px 18px;
      }
      
      .message-time {
        font-size: 0.7rem;
        color: #999;
        margin-top: 4px;
        text-align: right;
      }
      
      .chat-input-container {
        padding: 12px;
        border-top: 1px solid #eee;
        display: flex;
        gap: 8px;
      }
      
      .chat-input {
        flex: 1;
        padding: 10px 15px;
        border: 1px solid #ddd;
        border-radius: 20px;
        outline: none;
        font-size: 0.95rem;
      }
      
      .send-button {
        background-color: #800020;
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .typing-indicator {
        display: flex;
        align-items: center;
        padding: 8px 15px;
        background-color: white;
        border: 1px solid #e5e5ea;
        border-radius: 18px 18px 18px 4px;
        align-self: flex-start;
        margin-bottom: 10px;
      }
      
      .typing-dot {
        width: 8px;
        height: 8px;
        background-color: #800020;
        border-radius: 50%;
        margin: 0 2px;
        animation: typingAnimation 1.4s infinite ease-in-out;
      }
      
      .typing-dot:nth-child(1) {
        animation-delay: 0s;
      }
      
      .typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes typingAnimation {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.6;
        }
        30% {
          transform: translateY(-5px);
          opacity: 1;
        }
      }
      
      .quick-replies {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 0 15px 15px;
        background-color: #f9f9f9;
      }
      
      .quick-reply {
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 16px;
        padding: 6px 12px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .quick-reply:hover {
        background-color: #800020;
        color: white;
        border-color: #800020;
      }
    `;
        document.head.appendChild(style);
    }

    toggleChat() {
        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            this.createChatWindow();
            this.hideNotification();
        } else {
            this.closeChatWindow();
        }
    }

    createChatWindow() {
        if (this.chatWindow) {
            this.chatWindow.classList.add('open');
            return;
        }

        this.chatWindow = document.createElement('div');
        this.chatWindow.className = 'chat-window';
        this.chatWindow.innerHTML = `
      <div class="chat-header">
        <h3 class="chat-title">U1 Technology Assistant</h3>
        <button class="close-chat">&times;</button>
      </div>
      <div class="chat-messages" id="chat-messages"></div>
      <div class="quick-replies" id="quick-replies">
        <div class="quick-reply" data-message="What courses do you offer?">Courses</div>
        <div class="quick-reply" data-message="How do I contact support?">Contact</div>
        <div class="quick-reply" data-message="What are your prices?">Pricing</div>
      </div>
      <div class="chat-input-container">
        <input type="text" class="chat-input" placeholder="Type your message...">
        <button class="send-button">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    `;

        document.body.appendChild(this.chatWindow);

        setTimeout(() => {
            this.chatWindow.classList.add('open');
        }, 10);

        // Add event listeners
        this.chatWindow.querySelector('.close-chat').addEventListener('click', () => this.toggleChat());

        const sendButton = this.chatWindow.querySelector('.send-button');
        const chatInput = this.chatWindow.querySelector('.chat-input');

        sendButton.addEventListener('click', () => this.handleSendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSendMessage();
            }
        });

        // Add quick reply handlers
        const quickReplies = this.chatWindow.querySelectorAll('.quick-reply');
        quickReplies.forEach(reply => {
            reply.addEventListener('click', () => {
                const message = reply.getAttribute('data-message');
                this.addMessage(message, 'user');
                this.generateResponse(message);
            });
        });

        // Add welcome message if first time
        if (this.messages.length === 0) {
            this.addMessage("Hello! I'm your U1 Technology assistant. How can I help you today?", 'bot');
        } else {
            // Replay previous messages
            this.messages.forEach(msg => {
                this.addMessage(msg.text, msg.sender, true);
            });
        }

        // Scroll to bottom
        this.scrollToBottom();
    }

    closeChatWindow() {
        if (this.chatWindow) {
            this.chatWindow.classList.remove('open');
            setTimeout(() => {
                if (this.chatWindow && !this.isOpen) {
                    this.chatWindow.remove();
                    this.chatWindow = null;
                }
            }, 300);
        }
    }

    handleSendMessage() {
        const chatInput = this.chatWindow.querySelector('.chat-input');
        const message = chatInput.value.trim();

        if (message) {
            this.addMessage(message, 'user');
            this.generateResponse(message);
            chatInput.value = '';
        }
    }

    addMessage(text, sender, noSave = false) {
        if (!noSave) {
            this.messages.push({ text, sender });
        }

        if (!this.chatWindow) return;

        const messagesContainer = this.chatWindow.querySelector('#chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageElement.innerHTML = `
      <div>${text}</div>
      <div class="message-time">${timeString}</div>
    `;

        messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        if (!this.chatWindow) return;

        const messagesContainer = this.chatWindow.querySelector('#chat-messages');
        const typingElement = document.createElement('div');
        typingElement.className = 'typing-indicator';
        typingElement.id = 'typing-indicator';
        typingElement.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;

        messagesContainer.appendChild(typingElement);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        if (!this.chatWindow) return;

        const typingElement = this.chatWindow.querySelector('#typing-indicator');
        if (typingElement) {
            typingElement.remove();
        }
    }

    generateResponse(userMessage) {
        this.showTypingIndicator();

        // Simulate processing delay
        setTimeout(() => {
            this.hideTypingIndicator();

            const lowerMessage = userMessage.toLowerCase();
            let response = this.sampleResponses.default;

            if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                response = this.sampleResponses.hello;
            } else if (lowerMessage.includes('course')) {
                response = this.sampleResponses.courses;
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
                response = this.sampleResponses.contact;
            } else if (lowerMessage.includes('thank')) {
                response = this.sampleResponses.thanks;
            }

            this.addMessage(response, 'bot');

            // Add follow-up quick replies for certain responses
            if (lowerMessage.includes('course')) {
                this.updateQuickReplies([
                    { text: "Web Development", message: "Tell me about Web Development courses" },
                    { text: "Data Science", message: "Tell me about Data Science courses" },
                    { text: "Mobile Development", message: "Tell me about Mobile Development courses" }
                ]);
            } else if (lowerMessage.includes('thank')) {
                this.updateQuickReplies([
                    { text: "I need more help", message: "I still need assistance" },
                    { text: "Browse courses", message: "Show me your courses" },
                    { text: "Contact support", message: "How do I contact support?" }
                ]);
            } else {
                this.updateQuickReplies([
                    { text: "What courses do you offer?", message: "What courses do you offer?" },
                    { text: "How do I contact support?", message: "How do I contact support?" },
                    { text: "What are your prices?", message: "What are your prices?" }
                ]);
            }
        }, 1500 + Math.random() * 1000);
    }

    updateQuickReplies(replies) {
        if (!this.chatWindow) return;

        const quickRepliesContainer = this.chatWindow.querySelector('#quick-replies');
        quickRepliesContainer.innerHTML = '';

        replies.forEach(reply => {
            const replyElement = document.createElement('div');
            replyElement.className = 'quick-reply';
            replyElement.textContent = reply.text;
            replyElement.setAttribute('data-message', reply.message);

            replyElement.addEventListener('click', () => {
                this.addMessage(reply.message, 'user');
                this.generateResponse(reply.message);
            });

            quickRepliesContainer.appendChild(replyElement);
        });
    }

    scrollToBottom() {
        if (!this.chatWindow) return;

        const messagesContainer = this.chatWindow.querySelector('#chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showNotification() {
        if (!this.isOpen && this.notificationBadge) {
            this.notificationBadge.textContent = '1';
            this.notificationBadge.style.opacity = '1';
        }
    }

    hideNotification() {
        if (this.notificationBadge) {
            this.notificationBadge.style.opacity = '0';
        }
    }
}

// Initialize the chat assistant when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.chatAssistant = new ChatAssistant();

    // Optional: Auto-open chat after 30 seconds if user hasn't interacted
    setTimeout(() => {
        if (!window.chatAssistant.isOpen && window.chatAssistant.messages.length === 0) {
            window.chatAssistant.toggleChat();
        }
    }, 30000);
});