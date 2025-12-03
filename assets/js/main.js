// 学校页面主逻辑
document.addEventListener('DOMContentLoaded', function() {
    console.log('学校专属页面加载完成');
    
    // 初始化基础信息
    initBasicInfo();
    
    // 加载学校配置
    loadSchoolConfig();
    
    // 监听来自主系统的消息（如果通过iframe嵌入）
    setupMessageListener();
});

function initBasicInfo() {
    // 设置当前日期
    const now = new Date();
    document.getElementById('current-date').textContent = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    
    document.getElementById('current-year').textContent = now.getFullYear();
    
    // 设置最后更新时间
    document.getElementById('last-updated').textContent = document.lastModified || '未知';
    
    // 设置页面ID
    const pageId = window.PAGE_CONFIG?.schoolId || '未配置';
    document.getElementById('page-id').textContent = pageId;
}

async function loadSchoolConfig() {
    try {
        const response = await fetch('/config.json');
        const config = await response.json();
        
        // 应用配置到页面
        applyConfigToPage(config);
        
        // 模拟API数据加载
        simulateDataLoading(config);
        
    } catch (error) {
        console.error('加载配置失败:', error);
        showErrorMessage('加载学校配置失败，请检查config.json文件');
    }
}

function applyConfigToPage(config) {
    // 1. 设置学校基本信息
    document.title = `${config.school_name} - 专属页面`;
    document.getElementById('school-title').textContent = config.school_name;
    document.getElementById('school-slogan').textContent = config.school_slogan;
    document.getElementById('footer-school-name').textContent = config.school_name;
    
    // 2. 设置主题颜色
    if (config.primary_color) {
        document.documentElement.style.setProperty('--primary-color', config.primary_color);
    }
    
    // 3. 设置Logo
    const logoImg = document.getElementById('school-logo');
    if (config.logo_url && config.logo_url !== 'https://placekitten.com/200/200') {
        logoImg.src = config.logo_url;
        logoImg.alt = `${config.school_name} Logo`;
    }
    
    // 4. 填充学校信息
    const schoolInfoList = document.getElementById('school-info');
    if (schoolInfoList) {
        schoolInfoList.innerHTML = `
            <li class="flex items-center"><span class="mr-2">🏷️</span> 学校ID: ${config.school_id}</li>
            <li class="flex items-center"><span class="mr-2">🎯</span> 校训: ${config.school_slogan}</li>
            <li class="flex items-center"><span class="mr-2">✨</span> 特色: ${config.features?.join(', ') || '暂无'}</li>
        `;
    }
    
    // 5. 填充联系信息
    const contactInfoList = document.getElementById('contact-info');
    if (contactInfoList && config.contact) {
        contactInfoList.innerHTML = `
            <li class="flex items-center"><span class="mr-2">📍</span> ${config.contact.address}</li>
            <li class="flex items-center"><span class="mr-2">📞</span> ${config.contact.phone}</li>
            <li class="flex items-center"><span class="mr-2">✉️</span> ${config.contact.email}</li>
            <li class="flex items-center"><span class="mr-2">🌐</span> ${config.contact.website}</li>
        `;
    }
}

function simulateDataLoading(config) {
    // 模拟公告加载
    const newsContainer = document.getElementById('news-container');
    if (newsContainer && config.announcements) {
        setTimeout(() => {
            newsContainer.innerHTML = config.announcements.map(ann => `
                <div class="mb-4 pb-4 border-b border-gray-100 last:border-0 fade-in">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-bold text-lg">${ann.title}</h4>
                        <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">${ann.date}</span>
                    </div>
                    <p class="text-gray-700">${ann.content}</p>
                </div>
            `).join('');
        }, 800);
    }
    
    // 模拟自定义内容
    const customContent = document.getElementById('custom-content');
    if (customContent) {
        setTimeout(() => {
            customContent.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="info-card bg-blue-50 p-4 rounded-lg">
                        <div class="text-blue-600 text-2xl mb-2">📊</div>
                        <h4 class="font-bold mb-1">数据统计</h4>
                        <p class="text-sm text-gray-600">实时展示学校教学数据</p>
                    </div>
                    <div class="info-card bg-green-50 p-4 rounded-lg">
                        <div class="text-green-600 text-2xl mb-2">👨‍🏫</div>
                        <h4 class="font-bold mb-1">教师团队</h4>
                        <p class="text-sm text-gray-600">展示优秀师资力量</p>
                    </div>
                    <div class="info-card bg-purple-50 p-4 rounded-lg">
                        <div class="text-purple-600 text-2xl mb-2">🏆</div>
                        <h4 class="font-bold mb-1">荣誉奖项</h4>
                        <p class="text-sm text-gray-600">学校取得的各项成就</p>
                    </div>
                </div>
                <p class="mt-6 text-gray-600 text-sm">提示：此区域内容可根据学校需求完全自定义，替换此部分HTML代码即可。</p>
            `;
        }, 1200);
    }
}

function setupMessageListener() {
    // 监听来自主系统iframe的消息
    window.addEventListener('message', function(event) {
        // 重要：验证消息来源（确保安全）
        // if (event.origin !== 'https://你的主系统域名.com') return;
        
        console.log('收到主系统消息:', event.data);
        
        switch(event.data.type) {
            case 'UPDATE_USER':
                // 更新用户信息
                const userName = document.getElementById('user-name');
                if (userName && event.data.user) {
                    userName.textContent = event.data.user.name;
                }
                break;
                
            case 'UPDATE_THEME':
                // 更新主题
                if (event.data.themeColor) {
                    document.documentElement.style.setProperty('--primary-color', event.data.themeColor);
                }
                break;
                
            case 'REQUEST_DATA':
                // 向主系统发送响应
                event.source.postMessage({
                    type: 'PAGE_READY',
                    schoolId: window.PAGE_CONFIG?.schoolId,
                    timestamp: new Date().toISOString()
                }, event.origin);
                break;
        }
    });
}

function showErrorMessage(message) {
    const container = document.getElementById('news-container') || document.body;
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4';
    errorDiv.innerHTML = `
        <div class="flex">
            <div class="py-1">
                <svg class="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <p class="font-bold">加载异常</p>
                <p class="text-sm">${message}</p>
                <button onclick="location.reload()" class="mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded">
                    重新加载
                </button>
            </div>
        </div>
    `;
    container.appendChild(errorDiv);
}

// 提供全局函数供学校自定义使用
window.SchoolPage = {
    reloadConfig: function() {
        loadSchoolConfig();
        return '配置已重新加载';
    },
    getPageInfo: function() {
        return {
            schoolId: window.PAGE_CONFIG?.schoolId,
            lastUpdated: document.lastModified,
            configUrl: '/config.json'
        };
    }
};
