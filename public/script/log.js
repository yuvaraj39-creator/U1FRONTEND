document.addEventListener('DOMContentLoaded', function() {
    // Create the modal structure
    const modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.3)'; // More transparent
    modal.style.backdropFilter = 'blur(8px)'; // Blur effect
    modal.style.zIndex = '1000';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.transition = 'all 0.3s ease';

    // Modal content container
    const modalContent = document.createElement('div');
    modalContent.style.position = 'relative';
    modalContent.style.backgroundColor = 'rgba(0, 0, 0, 0.55)'; // Semi-transparent white
    modalContent.style.borderRadius = '15px';
    modalContent.style.padding = '30px';
    modalContent.style.width = '400px';
    modalContent.style.maxWidth = '90%';
    modalContent.style.maxHeight = '90vh'; // Limit height
    modalContent.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    modalContent.style.transition = 'all 0.3s ease';
    modalContent.style.overflow = 'hidden'; // For scroll containment
    
    // Add glow effect on hover
    modalContent.addEventListener('mouseenter', () => {
        modalContent.style.boxShadow = '0 15px 30px rgba(128, 0, 32, 0.3)';
        modalContent.style.transform = 'translateY(-5px)';
    });
    
    modalContent.addEventListener('mouseleave', () => {
        modalContent.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        modalContent.style.transform = 'translateY(0)';
    });

    // Scrollable form container
    const scrollableContainer = document.createElement('div');
    scrollableContainer.style.maxHeight = 'calc(90vh - 100px)'; // Account for padding and header
    scrollableContainer.style.overflowY = 'auto';
    scrollableContainer.style.paddingRight = '10px'; // Prevent content from being hidden under scrollbar

    // Close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '15px';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = '#800020';
    closeBtn.style.transition = 'color 0.3s ease';
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.color = '#600018';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.color = '#800020';
    });

    // Tab container
    const tabContainer = document.createElement('div');
    tabContainer.style.display = 'flex';
    tabContainer.style.marginBottom = '20px';
    tabContainer.style.borderBottom = '1px solid rgba(221, 221, 221, 0.5)'; // Semi-transparent

    // Login tab
    const loginTab = document.createElement('button');
    loginTab.textContent = 'Login';
    loginTab.style.flex = '1';
    loginTab.style.padding = '10px';
    loginTab.style.border = 'none';
    loginTab.style.background = 'none';
    loginTab.style.fontWeight = 'bold';
    loginTab.style.cursor = 'pointer';
    loginTab.style.borderBottom = '3px solid transparent';
    loginTab.style.color = '#800020';
    loginTab.style.transition = 'all 0.3s ease';

    // Signup tab
    const signupTab = document.createElement('button');
    signupTab.textContent = 'Sign Up';
    signupTab.style.flex = '1';
    signupTab.style.padding = '10px';
    signupTab.style.border = 'none';
    signupTab.style.background = 'none';
    signupTab.style.fontWeight = 'bold';
    signupTab.style.cursor = 'pointer';
    signupTab.style.borderBottom = '3px solid transparent';
    signupTab.style.color = '#800020';
    signupTab.style.transition = 'all 0.3s ease';

    // Forms container
    const formsContainer = document.createElement('div');
    formsContainer.style.position = 'relative';
    formsContainer.style.minHeight = '400px';

    // Login form
    const loginForm = createLoginForm();
    formsContainer.appendChild(loginForm);

    // Signup form
    const signupForm = createSignupForm();
    signupForm.style.display = 'none';
    formsContainer.appendChild(signupForm);

    // Forgot password form
    const forgotPasswordForm = createForgotPasswordForm();
    forgotPasswordForm.style.display = 'none';
    formsContainer.appendChild(forgotPasswordForm);

    // Assemble the modal
    tabContainer.appendChild(loginTab);
    tabContainer.appendChild(signupTab);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(tabContainer);
    scrollableContainer.appendChild(formsContainer);
    modalContent.appendChild(scrollableContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Active tab styling
    function setActiveTab(tab) {
        loginTab.style.borderBottomColor = tab === 'login' ? '#800020' : 'transparent';
        signupTab.style.borderBottomColor = tab === 'signup' ? '#800020' : 'transparent';
        loginTab.style.color = tab === 'login' ? '#800020' : '#6b7280';
        signupTab.style.color = tab === 'signup' ? '#800020' : '#6b7280';
        loginForm.style.display = tab === 'login' ? 'block' : 'none';
        signupForm.style.display = tab === 'signup' ? 'block' : 'none';
        forgotPasswordForm.style.display = 'none';
        
        // Scroll to top when switching tabs
        scrollableContainer.scrollTop = 0;
    }

    // Event listeners
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        modal.style.backdropFilter = 'blur(0)';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            modal.style.backdropFilter = 'blur(0)';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    loginTab.addEventListener('click', () => setActiveTab('login'));
    signupTab.addEventListener('click', () => setActiveTab('signup'));

    // Handle header sign-in button
    const headerSignInBtn = document.getElementById('header-signin-btn');
    const mobileSignInBtn = document.querySelector('#mobile-menu button');

    if (headerSignInBtn) {
        headerSignInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.style.backdropFilter = 'blur(8px)';
            }, 10);
            setActiveTab('login');
        });
    }

    if (mobileSignInBtn) {
        mobileSignInBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.style.backdropFilter = 'blur(8px)';
            }, 10);
            setActiveTab('login');
            // Close mobile menu
            document.getElementById('mobile-menu').classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    }

    // Fallback - create floating button if header buttons not found
    if (!headerSignInBtn && !mobileSignInBtn) {
        const triggerBtn = document.createElement('button');
        triggerBtn.textContent = 'Login/Signup';
        triggerBtn.style.position = 'fixed';
        triggerBtn.style.top = '20px';
        triggerBtn.style.right = '20px';
        triggerBtn.style.padding = '10px 20px';
        triggerBtn.style.backgroundColor = '#800020';
        triggerBtn.style.color = 'white';
        triggerBtn.style.border = 'none';
        triggerBtn.style.borderRadius = '5px';
        triggerBtn.style.cursor = 'pointer';
        triggerBtn.style.zIndex = '100';
        triggerBtn.style.transition = 'all 0.3s ease';
        
        triggerBtn.addEventListener('mouseenter', () => {
            triggerBtn.style.transform = 'scale(1.05)';
            triggerBtn.style.boxShadow = '0 5px 15px rgba(128, 0, 32, 0.4)';
        });
        
        triggerBtn.addEventListener('mouseleave', () => {
            triggerBtn.style.transform = 'scale(1)';
            triggerBtn.style.boxShadow = 'none';
        });

        triggerBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.style.backdropFilter = 'blur(8px)';
            }, 10);
            setActiveTab('login');
        });

        document.body.appendChild(triggerBtn);
    }

    // Helper functions to create forms
    function createLoginForm() {
        const form = document.createElement('form');
        form.id = 'login-form';

        const heading = document.createElement('h2');
        heading.textContent = 'Welcome Back';
        heading.style.marginBottom = '20px';
        heading.style.textAlign = 'center';
        heading.style.color = '#800020';
        heading.style.fontWeight = '600';

        const emailGroup = createInputGroup('email', 'Email', 'email', true);
        const passwordGroup = createInputGroup('password', 'Password', 'password', true);

        const forgotPasswordLink = document.createElement('a');
        forgotPasswordLink.textContent = 'Forgot Password?';
        forgotPasswordLink.style.display = 'block';
        forgotPasswordLink.style.textAlign = 'right';
        forgotPasswordLink.style.margin = '5px 0 20px';
        forgotPasswordLink.style.color = '#800020';
        forgotPasswordLink.style.textDecoration = 'none';
        forgotPasswordLink.style.cursor = 'pointer';
        forgotPasswordLink.style.transition = 'color 0.3s ease';
        
        forgotPasswordLink.addEventListener('mouseenter', () => {
            forgotPasswordLink.style.color = '#600018';
        });
        
        forgotPasswordLink.addEventListener('mouseleave', () => {
            forgotPasswordLink.style.color = '#800020';
        });

        const loginBtn = document.createElement('button');
        loginBtn.textContent = 'Login';
        loginBtn.type = 'submit';
        loginBtn.style.width = '100%';
        loginBtn.style.padding = '12px';
        loginBtn.style.backgroundColor = '#800020';
        loginBtn.style.color = 'white';
        loginBtn.style.border = 'none';
        loginBtn.style.borderRadius = '5px';
        loginBtn.style.cursor = 'pointer';
        loginBtn.style.fontSize = '16px';
        loginBtn.style.marginTop = '10px';
        loginBtn.style.transition = 'all 0.3s ease';
        loginBtn.addEventListener('mouseenter', () => {
            loginBtn.style.backgroundColor = '#600018';
            loginBtn.style.transform = 'translateY(-2px)';
            loginBtn.style.boxShadow = '0 5px 10px rgba(128, 0, 32, 0.3)';
        });
        loginBtn.addEventListener('mouseleave', () => {
            loginBtn.style.backgroundColor = '#800020';
            loginBtn.style.transform = 'translateY(0)';
            loginBtn.style.boxShadow = 'none';
        });

        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            form.style.display = 'none';
            forgotPasswordForm.style.display = 'block';
            scrollableContainer.scrollTop = 0;
        });

        form.appendChild(heading);
        form.appendChild(emailGroup);
        form.appendChild(passwordGroup);
        form.appendChild(forgotPasswordLink);
        form.appendChild(loginBtn);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login functionality would be implemented here');
        });

        return form;
    }

    function createSignupForm() {
        const form = document.createElement('form');
        form.id = 'signup-form';

        const heading = document.createElement('h2');
        heading.textContent = 'Create Account';
        heading.style.marginBottom = '20px';
        heading.style.textAlign = 'center';
        heading.style.color = '#800020';
        heading.style.fontWeight = '600';

        const nameGroup = createInputGroup('name', 'Full Name', 'text', true);
        const emailGroup = createInputGroup('signup-email', 'Email', 'email', true);
        const phoneGroup = createInputGroup('phone', 'Phone Number', 'tel', true);

        // Experience radio buttons
        const experienceGroup = document.createElement('div');
        experienceGroup.style.marginBottom = '20px';

        const experienceLabel = document.createElement('label');
        experienceLabel.textContent = 'Experience';
        experienceLabel.style.display = 'block';
        experienceLabel.style.marginBottom = '8px';
        experienceLabel.style.fontWeight = '500';
        experienceLabel.style.color = '#800020';

        const options = [
            'Working professional – Technical roles',
            'Working professional – Non-technical',
            'College student – Final year',
            'Internship',
            'Others'
        ];

        // Create a container for the additional info input
        const additionalInfoContainer = document.createElement('div');
        additionalInfoContainer.style.marginTop = '10px';
        additionalInfoContainer.style.display = 'none';

        // Additional info input (will be shown below selected radio button)
        const additionalInfo = document.createElement('textarea');
        additionalInfo.placeholder = 'Please provide more information...';
        additionalInfo.style.width = '100%';
        additionalInfo.style.padding = '10px';
        additionalInfo.style.border = '1px solid #800020';
        additionalInfo.style.borderRadius = '5px';
        additionalInfo.style.backgroundColor = 'transparent';
        additionalInfo.style.color = '#fff';
        additionalInfo.style.transition = 'all 0.3s ease';
        additionalInfo.addEventListener('focus', () => {
            additionalInfo.style.borderColor = '#800020';
            additionalInfo.style.outline = 'none';
        });
        additionalInfo.addEventListener('blur', () => {
            additionalInfo.style.borderColor = '#800020';
        });

        additionalInfoContainer.appendChild(additionalInfo);
        experienceGroup.appendChild(additionalInfoContainer);

        options.forEach((option, index) => {
            const radioDiv = document.createElement('div');
            radioDiv.style.marginBottom = '8px';
            radioDiv.style.position = 'relative';

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.id = `exp-${index}`;
            radioInput.name = 'experience';
            radioInput.value = option;
            radioInput.style.marginRight = '8px';
            radioInput.style.cursor = 'pointer';
            radioInput.style.accentColor = '#800020';

            const radioLabel = document.createElement('label');
            radioLabel.htmlFor = `exp-${index}`;
            radioLabel.textContent = option;
            radioLabel.style.color = '#6b7280';
            radioLabel.style.cursor = 'pointer';
            radioLabel.style.transition = 'color 0.3s ease';
            
            radioInput.addEventListener('change', () => {
                // Reset all radio label colors
                document.querySelectorAll('#signup-form label[for^="exp-"]').forEach(label => {
                    label.style.color = '#6b7280';
                });
                
                // Set color for selected radio
                radioLabel.style.color = '#800020';
                
                // Show additional info container below the selected radio button
                additionalInfoContainer.style.display = 'block';
                
                // Move the additional info container to be right after the selected radio button
                radioDiv.insertAdjacentElement('afterend', additionalInfoContainer);
            });

            radioDiv.appendChild(radioInput);
            radioDiv.appendChild(radioLabel);
            experienceGroup.appendChild(radioDiv);
        });

        const passwordGroup = createInputGroup('signup-password', 'Password', 'password', true);
        const confirmPasswordGroup = createInputGroup('confirm-password', 'Confirm Password', 'password', true);

        const signupBtn = document.createElement('button');
        signupBtn.textContent = 'Create Account';
        signupBtn.type = 'submit';
        signupBtn.style.width = '100%';
        signupBtn.style.padding = '12px';
        signupBtn.style.backgroundColor = '#800020';
        signupBtn.style.color = 'white';
        signupBtn.style.border = 'none';
        signupBtn.style.borderRadius = '5px';
        signupBtn.style.cursor = 'pointer';
        signupBtn.style.fontSize = '16px';
        signupBtn.style.marginTop = '10px';
        signupBtn.style.transition = 'all 0.3s ease';
        signupBtn.addEventListener('mouseenter', () => {
            signupBtn.style.backgroundColor = '#600018';
            signupBtn.style.transform = 'translateY(-2px)';
            signupBtn.style.boxShadow = '0 5px 10px rgba(128, 0, 32, 0.3)';
        });
        signupBtn.addEventListener('mouseleave', () => {
            signupBtn.style.backgroundColor = '#800020';
            signupBtn.style.transform = 'translateY(0)';
            signupBtn.style.boxShadow = 'none';
        });

        form.appendChild(heading);
        form.appendChild(nameGroup);
        form.appendChild(emailGroup);
        form.appendChild(phoneGroup);
        form.appendChild(experienceLabel);
        form.appendChild(experienceGroup);
        form.appendChild(passwordGroup);
        form.appendChild(confirmPasswordGroup);
        form.appendChild(signupBtn);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            alert('Signup functionality would be implemented here');
        });

        return form;
    }

    function createForgotPasswordForm() {
        const form = document.createElement('form');
        form.id = 'forgot-password-form';

        const backBtn = document.createElement('button');
        backBtn.innerHTML = '&larr; Back to Login';
        backBtn.style.background = 'none';
        backBtn.style.border = 'none';
        backBtn.style.fontSize = '14px';
        backBtn.style.cursor = 'pointer';
        backBtn.style.marginBottom = '15px';
        backBtn.style.color = '#800020';
        backBtn.style.padding = '0';
        backBtn.style.transition = 'color 0.3s ease';
        
        backBtn.addEventListener('mouseenter', () => {
            backBtn.style.color = '#600018';
        });
        
        backBtn.addEventListener('mouseleave', () => {
            backBtn.style.color = '#800020';
        });

        const heading = document.createElement('h2');
        heading.textContent = 'Forgot Password';
        heading.style.marginBottom = '20px';
        heading.style.textAlign = 'center';
        heading.style.color = '#800020';
        heading.style.fontWeight = '600';

        const emailGroup = createInputGroup('forgot-email', 'Email', 'email', true);

        const sendOtpBtn = document.createElement('button');
        sendOtpBtn.textContent = 'Send OTP';
        sendOtpBtn.type = 'button';
        sendOtpBtn.style.width = '100%';
        sendOtpBtn.style.padding = '12px';
        sendOtpBtn.style.backgroundColor = '#800020';
        sendOtpBtn.style.color = 'white';
        sendOtpBtn.style.border = 'none';
        sendOtpBtn.style.borderRadius = '5px';
        sendOtpBtn.style.cursor = 'pointer';
        sendOtpBtn.style.fontSize = '16px';
        sendOtpBtn.style.marginTop = '10px';
        sendOtpBtn.style.transition = 'all 0.3s ease';
        sendOtpBtn.addEventListener('mouseenter', () => {
            sendOtpBtn.style.backgroundColor = '#600018';
            sendOtpBtn.style.transform = 'translateY(-2px)';
            sendOtpBtn.style.boxShadow = '0 5px 10px rgba(128, 0, 32, 0.3)';
        });
        sendOtpBtn.addEventListener('mouseleave', () => {
            sendOtpBtn.style.backgroundColor = '#800020';
            sendOtpBtn.style.transform = 'translateY(0)';
            sendOtpBtn.style.boxShadow = 'none';
        });

        // OTP section (initially hidden)
        const otpGroup = createInputGroup('otp', 'OTP', 'text', false);
        otpGroup.style.display = 'none';

        const timer = document.createElement('div');
        timer.style.textAlign = 'right';
        timer.style.margin = '5px 0';
        timer.style.color = '#800020';
        timer.style.display = 'none';

        const newPasswordGroup = createInputGroup('new-password', 'New Password', 'password', false);
        newPasswordGroup.style.display = 'none';

        const confirmNewPasswordGroup = createInputGroup('confirm-new-password', 'Confirm New Password', 'password', false);
        confirmNewPasswordGroup.style.display = 'none';

        const resetPasswordBtn = document.createElement('button');
        resetPasswordBtn.textContent = 'Reset Password';
        resetPasswordBtn.type = 'submit';
        resetPasswordBtn.style.width = '100%';
        resetPasswordBtn.style.padding = '12px';
        resetPasswordBtn.style.backgroundColor = '#800020';
        resetPasswordBtn.style.color = 'white';
        resetPasswordBtn.style.border = 'none';
        resetPasswordBtn.style.borderRadius = '5px';
        resetPasswordBtn.style.cursor = 'pointer';
        resetPasswordBtn.style.fontSize = '16px';
        resetPasswordBtn.style.marginTop = '10px';
        resetPasswordBtn.style.display = 'none';
        resetPasswordBtn.style.transition = 'all 0.3s ease';
        resetPasswordBtn.addEventListener('mouseenter', () => {
            resetPasswordBtn.style.backgroundColor = '#600018';
            resetPasswordBtn.style.transform = 'translateY(-2px)';
            resetPasswordBtn.style.boxShadow = '0 5px 10px rgba(128, 0, 32, 0.3)';
        });
        resetPasswordBtn.addEventListener('mouseleave', () => {
            resetPasswordBtn.style.backgroundColor = '#800020';
            resetPasswordBtn.style.transform = 'translateY(0)';
            resetPasswordBtn.style.boxShadow = 'none';
        });

        backBtn.addEventListener('click', () => {
            form.style.display = 'none';
            loginForm.style.display = 'block';
            scrollableContainer.scrollTop = 0;
        });

        sendOtpBtn.addEventListener('click', () => {
            // Simulate OTP sent
            otpGroup.style.display = 'block';
            newPasswordGroup.style.display = 'block';
            confirmNewPasswordGroup.style.display = 'block';
            resetPasswordBtn.style.display = 'block';
            sendOtpBtn.style.display = 'none';

            // Start timer
            let timeLeft = 120;
            timer.style.display = 'block';
            timer.textContent = `OTP expires in ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;
            
            const interval = setInterval(() => {
                timeLeft--;
                timer.textContent = `OTP expires in ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`;
                
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    timer.textContent = 'OTP expired';
                }
            }, 1000);
        });

        form.appendChild(backBtn);
        form.appendChild(heading);
        form.appendChild(emailGroup);
        form.appendChild(sendOtpBtn);
        form.appendChild(timer);
        form.appendChild(otpGroup);
        form.appendChild(newPasswordGroup);
        form.appendChild(confirmNewPasswordGroup);
        form.appendChild(resetPasswordBtn);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPassword = document.getElementById('new-password').value;
            const confirmNewPassword = document.getElementById('confirm-new-password').value;
            
            if (newPassword !== confirmNewPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            alert('Password reset functionality would be implemented here');
            form.style.display = 'none';
            loginForm.style.display = 'block';
            scrollableContainer.scrollTop = 0;
        });

        return form;
    }

    function createInputGroup(id, label, type, required) {
        const group = document.createElement('div');
        group.style.marginBottom = '15px';

        const labelEl = document.createElement('label');
        labelEl.htmlFor = id;
        labelEl.textContent = label;
        labelEl.style.display = 'block';
        labelEl.style.marginBottom = '8px';
        labelEl.style.fontWeight = '500';
        labelEl.style.color = '#800020';

        const input = document.createElement('input');
        input.type = type;
        input.id = id;
        input.name = id;
        input.required = required;
        input.style.width = '100%';
        input.style.padding = '10px';
        input.style.border = '1px solid #800020';
        input.style.borderRadius = '5px';
        input.style.fontSize = '16px';
        input.style.backgroundColor = 'transparent';
        input.style.color = '#fff';
        input.style.transition = 'all 0.3s ease';
        input.addEventListener('focus', () => {
            input.style.borderColor = '#800020';
            input.style.outline = 'none';
            input.style.boxShadow = '0 0 0 2px rgba(128, 0, 32, 0.2)';
        });
        input.addEventListener('blur', () => {
            input.style.borderColor = '#800020';
            input.style.boxShadow = 'none';
        });

        // Add placeholder styling
        const style = document.createElement('style');
        style.textContent = `
            #${id}::placeholder {
                color: rgba(255, 255, 255, 0.5);
                opacity: 1;
            }
        `;
        document.head.appendChild(style);

        group.appendChild(labelEl);
        group.appendChild(input);

        return group;
    }
});