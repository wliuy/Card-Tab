const HTML_CONTENT = `
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Tab</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>⭐</text></svg>">
    <style>
        /* 全局样式 */
        body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f6f2;
            color: #222;
            transition: all 0.3s ease;
        }

        /* 暗色模式样式 */
        body.dark-theme {
            background-color: #121418;
            color: #e3e3e3;
        }

        /* 固定元素样式 */
        .fixed-elements {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: #f8f6f2;
            z-index: 1000;
            padding: 10px;
            transition: all 0.3s ease;
            height: 150px;
            box-shadow: none;
        }

        body.dark-theme .fixed-elements {
            background-color: #121418;
            box-shadow: none;
        }

        .category-button {
            padding: 5px 10px;
            border-radius: 15px;
            background-color: #f9fafb;
            color: #43b883;
            border: none;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.2s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
            flex: 0 0 auto;
            white-space: nowrap;
            margin: 0 2px;
            position: relative;
            overflow: hidden;
        }

        body.dark-theme .category-button {
            background-color: #2a2e38;
            color: #5d7fb9;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .category-button:hover {
            background-color: #43b883;
            color: white;
            transform: translateY(-1px);
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.12);
        }

        .category-button.active {
            background-color: #43b883;
            color: white;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
            transform: translateY(-1px);
            font-weight: 600;
            border-bottom: 2px solid #35a674;
        }

        body.dark-theme .category-button:hover,
        body.dark-theme .category-button.active {
            background-color: #5d7fb9;
            color: white;
        }

        .fixed-elements h3 {
            position: absolute;
            top: 10px;
            left: 20px;
            margin: 0;
            font-size: 22px;
            font-weight: 600;
            color: #43b883;
            transition: all 0.3s ease;
        }

        body.dark-theme .fixed-elements h3 {
            color: #5d7fb9;
        }

        #hitokoto {
            margin: 5px 0 15px;
            font-size: 14px;
            color: #888;
            font-style: italic;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            transition: all 0.3s ease;
        }

        #hitokoto a {
            color: #43b883;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        #hitokoto a:hover {
            color: #35a674;
        }

        body.dark-theme #hitokoto {
            color: #a0a0a0;
        }

        body.dark-theme #hitokoto a {
            color: #5d7fb9;
        }

        .center-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            max-width: none;
            text-align: center;
            padding: 0 10px;
        }

        .top-right-controls {
            position: fixed;
            top: 10px;
            right: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1001;
        }

        .admin-btn {
            background-color: #43b883;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .admin-btn:hover {
            background-color: #35a674;
            transform: translateY(-1px);
        }

        body.dark-theme .admin-btn {
            background-color: #5d7fb9;
        }

        body.dark-theme .admin-btn:hover {
            background-color: #4a6fa5;
        }

        .login-btn {
            background-color: #43b883;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .login-btn:hover {
            background-color: #35a674;
            transform: translateY(-1px);
        }

        body.dark-theme .login-btn {
            background-color: #5d7fb9;
        }

        body.dark-theme .login-btn:hover {
            background-color: #4a6fa5;
        }

        .bookmark-search-toggle {
            background-color: #43b883;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 0;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            position: relative;
        }

        .bookmark-search-toggle:hover {
            background-color: #35a674;
            transform: translateY(-2px);
        }

        .bookmark-search-toggle svg {
            width: 20px;
            height: 20px;
            stroke: white;
        }

        body.dark-theme .bookmark-search-toggle {
            background-color: #5d7fb9;
        }

        body.dark-theme .bookmark-search-toggle:hover {
            background-color: #4a6fa5;
        }

        .bookmark-search-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            width: 140px;
            background-color: white;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            padding: 8px;
            margin-top: 4px;
            display: none;
            z-index: 1002;
        }

        .bookmark-search-dropdown.show {
            display: block;
        }

        .bookmark-search-dropdown input {
            width: 100%;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 13px;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }

        .bookmark-search-dropdown input:focus {
            border-color: #43b883;
            box-shadow: 0 0 0 2px rgba(67, 184, 131, 0.2);
            outline: none;
        }

        .bookmark-search-dropdown input::placeholder {
            color: #999;
        }

        body.dark-theme .bookmark-search-dropdown {
            background-color: #323642;
            border-color: #444;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        body.dark-theme .bookmark-search-dropdown input {
            background-color: #252830;
            color: #e3e3e3;
            border-color: #444;
        }

        body.dark-theme .bookmark-search-dropdown input::placeholder {
            color: #888;
        }

        .login-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            justify-content: center;
            align-items: center;
            z-index: 2000;
            backdrop-filter: blur(3px);
        }

        .login-modal-content {
            background-color: white;
            padding: 25px;
            border-radius: 10px;
            width: 300px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            animation: modalFadeIn 0.3s ease;
        }

        @keyframes modalFadeIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .login-modal h3 {
            margin: 0 0 20px 0;
            color: #333;
            text-align: center;
            font-size: 18px;
        }

        .login-modal input {
            width: 100%;
            margin-bottom: 15px;
            padding: 10px;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            font-size: 14px;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }

        .login-modal input:focus {
            border-color: #43b883;
            box-shadow: 0 0 0 2px rgba(67, 184, 131, 0.2);
            outline: none;
        }

        .login-modal-buttons {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }

        .login-modal button {
            background-color: #43b883;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 13px;
        }

        .login-modal button:hover {
            background-color: #35a674;
        }

        .login-modal button.cancel {
            background-color: #f0f0f0;
            color: #333;
        }

        .login-modal button.cancel:hover {
            background-color: #e0e0e0;
        }

        body.dark-theme .login-modal-content {
            background-color: #252830;
            color: #e3e3e3;
        }

        body.dark-theme .login-modal h3 {
            color: #e3e3e3;
        }

        body.dark-theme .login-modal input {
            background-color: #323642;
            color: #e3e3e3;
            border-color: #444;
        }

        .search-results-section {
            margin-bottom: 30px;
        }

        .search-results-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #43b883;
        }

        body.dark-theme .search-results-header {
            background-color: #2d3748;
            border-left-color: #5d7fb9;
        }

        .search-results-title {
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }

        body.dark-theme .search-results-title {
            color: #e2e8f0;
        }

        .back-to-main {
            background-color: #43b883;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
        }

        .back-to-main:hover {
            background-color: #35a674;
        }

        body.dark-theme .back-to-main {
            background-color: #5d7fb9;
        }

        body.dark-theme .back-to-main:hover {
            background-color: #4a6fa5;
        }

        .no-search-results {
            text-align: center;
            padding: 30px;
            color: #888;
            font-size: 16px;
        }

        body.dark-theme .no-search-results {
            color: #a0a0a0;
        }

        .add-remove-controls {
            display: none;
            flex-direction: column;
            position: fixed;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            align-items: center;
            gap: 15px;
            z-index: 900;
        }

        .round-btn {
            background-color: #43b883;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            cursor: pointer;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            position: relative;
        }

        .round-btn svg {
            pointer-events: none;
            display: block;
            margin: auto;
        }

        .round-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        body.dark-theme .round-btn {
            background-color: #5d7fb9;
        }

        .content {
            margin-top: 170px;
            padding: 10px;
            max-width: 1600px;
            margin-left: auto;
            margin-right: auto;
            transition: opacity 0.3s ease;
        }

        .loading .content {
            opacity: 0.6;
        }

        .search-container {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        .search-bar {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            width: 100%;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            border: 1px solid #e0e0e0;
            transition: all 0.3s ease;
        }

        .search-bar:focus-within {
            box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
            border-color: #43b883;
        }

        .search-bar select {
            border: none;
            background-color: #f4f7fa;
            padding: 8px 25px 8px 10px;
            font-size: 13px;
            color: #43b883;
            max-width: 140px;
            min-width: 90px;
            outline: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6"><path fill="%2343b883" d="M0 0l6 6 6-6z"/></svg>');
            background-repeat: no-repeat;
            background-position: right 8px center;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 0;
            text-align: center;
            display: block;
        }

        body.dark-theme .search-bar {
            border-color: #323642;
            background-color: #1e2128;
        }

        body.dark-theme .search-bar select {
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" viewBox="0 0 12 6"><path fill="%235d7fb9" d="M0 0l6 6 6-6z"/></svg>');
            background-position: right 8px center;
            background-color: #252830;
            color: #5d7fb9;
        }

        body.dark-theme .search-bar input {
            background-color: #252830;
            color: #e3e3e3;
        }

        body.dark-theme .search-bar button {
            background-color: #5d7fb9;
        }

        body.dark-theme select option {
            background-color: #252830;
            color: #e3e3e3;
            white-space: nowrap;
            overflow: visible;
        }

        .search-bar input {
            flex: 1;
            border: none;
            padding: 10px 15px;
            font-size: 14px;
            background-color: #fff;
            outline: none;
        }

        .search-bar button {
            border: none;
            background-color: #43b883;
            color: white;
            padding: 0 20px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .search-bar button:hover {
            background-color: #35a674;
        }

        .category-buttons-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 6px;
            padding: 8px 12px;
            width: 100%;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 5px;
            background-color: transparent;
            border-radius: 8px;
            box-shadow: none;
            transition: all 0.3s ease;
            position: relative;
        }

        body.dark-theme .category-buttons-container {
            background-color: transparent;
            box-shadow: none;
        }

        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }

        body.dark-theme::-webkit-scrollbar-track {
            background: #252830;
        }

        body.dark-theme::-webkit-scrollbar-thumb {
            background: #444;
        }

        body.dark-theme::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        .category-buttons-container::-webkit-scrollbar {
            height: 4px;
        }

        .floating-button-group {
            position: fixed;
            bottom: 50px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            z-index: 1000;
        }

        .floating-button-group button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #43b883;
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
        }

        .floating-button-group button:hover {
            transform: translateY(-2px);
            background-color: #369f6b;
        }

        #back-to-top-btn {
            display: none;
        }

        body.dark-theme .floating-button-group button {
            background-color: #5d7fb9;
        }

        body.dark-theme .floating-button-group button:hover {
            background-color: #4a6fa5;
        }

        #theme-toggle {
            font-size: 24px;
            line-height: 40px;
        }

        #dialog-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            justify-content: center;
            align-items: center;
            z-index: 2000;
            backdrop-filter: blur(3px);
            transition: all 0.3s ease;
        }

        #dialog-box {
            background-color: white;
            padding: 25px;
            border-radius: 10px;
            width: 350px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            animation: dialogFadeIn 0.3s ease;
        }

        @keyframes dialogFadeIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        #dialog-box input,
        #dialog-box select {
            width: 100%;
            margin-bottom: 12px;
            padding: 8px 10px;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            font-size: 14px;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }

        #dialog-box input:focus,
        #dialog-box select:focus {
            border-color: #43b883;
            box-shadow: 0 0 0 2px rgba(67, 184, 131, 0.2);
            outline: none;
        }

        #dialog-box label {
            display: block;
            margin-bottom: 3px;
            font-weight: 500;
            color: #222;
        }

        #dialog-box button {
            background-color: #43b883;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-right: 10px;
        }

        #dialog-box button:hover {
            background-color: #35a674;
        }

        #dialog-box button.cancel {
            background-color: #f0f0f0;
            color: #333;
        }

        #dialog-box button.cancel:hover {
            background-color: #e0e0e0;
        }

        body.dark-theme #dialog-box {
            background-color: #252830;
            color: #e3e3e3;
        }

        body.dark-theme #dialog-box input,
        body.dark-theme #dialog-box select {
            background-color: #323642;
            color: #e3e3e3;
            border-color: #444;
        }

        body.dark-theme #dialog-box label {
            color: #a0b7d4;
        }

        .section {
            margin-bottom: 25px;
            padding: 0 15px;
        }

        .section-title-container {
            display: flex;
            align-items: center;
            margin-bottom: 18px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 10px;
            transition: border-color 0.3s ease;
            width: 100%;
            max-width: 1520px;
            margin-left: auto;
            margin-right: auto;
        }

        body.dark-theme .section-title-container {
            border-bottom-color: #2a2e38;
        }

        .section-title {
            font-size: 22px;
            font-weight: 600;
            color: #43b883;
            position: relative;
            padding-left: 15px;
            transition: color 0.3s ease;
            min-width: 120px;
        }

        body.dark-theme .section-title {
            color: #5d7fb9;
        }

        .section-title:before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 5px;
            height: 22px;
            background-color: #43b883;
            border-radius: 2px;
        }

        body.dark-theme .section-title:before {
            background-color: #5d7fb9;
        }

        .delete-category-btn {
            background-color: #ff9800;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 15px;
            font-size: 13px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
        }

        .delete-category-btn:hover {
            background-color: #f57c00;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
        }

        body.dark-theme .delete-category-btn {
            background-color: #ff9800;
            color: #252830;
        }

        .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, 150px);
            column-gap: 35px;
            row-gap: 15px;
            justify-content: start;
            padding: 15px;
            padding-left: 45px;
            margin: 0 auto;
            max-width: 1600px;
        }

        .card {
            background-color: white;
            border-radius: 8px;
            padding: 12px;
            width: 150px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            user-select: none;
            border-left: 3px solid #43b883;
            animation: fadeIn 0.3s ease forwards;
            animation-delay: calc(var(--card-index) * 0.05s);
            opacity: 0;
            margin: 2px;
        }

        .admin-mode .card {
            z-index: 20;
        }

        body.dark-theme .card {
            background-color: #1e2128;
            border-left-color: #5d7fb9;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
        }

        .card-top {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
        }

        .card-icon {
            width: 16px;
            height: 16px;
            margin-right: 5px;
            border-radius: 4px;
            object-fit: cover;
        }

        .card-title {
            font-size: 15px;
            font-weight: 600;
            color: #222;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: color 0.3s ease;
        }

        .card-url {
            font-size: 12px;
            color: #888;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: color 0.3s ease;
        }

        body.dark-theme .card-title {
            color: #e3e3e3;
        }

        body.dark-theme .card-url {
            color: #a0a0a0;
        }

        .private-tag {
            background-color: #ff9800;
            color: white;
            font-size: 10px;
            padding: 2px 5px;
            border-radius: 3px;
            position: absolute;
            top: 18px;
            right: 5px;
            z-index: 5;
        }

        #copyright {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            z-index: 1000;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.03);
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
        }

        #copyright p {
            margin: 0;
            font-weight: 500;
            color: #666;
        }

        #copyright a {
            color: #43b883;
            text-decoration: none;
            transition: all 0.3s ease;
            position: relative;
        }

        #copyright a:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: #43b883;
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        #copyright a:hover:after {
            transform: scaleX(1);
        }

        body.dark-theme #copyright {
            background-color: rgba(37, 40, 48, 0.9);
            color: #e3e3e3;
        }

        body.dark-theme #copyright a {
            color: #5d7fb9;
        }

        body.dark-theme #copyright a:after {
            background-color: #5d7fb9;
        }

        @media (max-width: 480px) {
            .fixed-elements {
                position: fixed;
                padding: 8px 12px 5px 12px;
                height: auto;
                min-height: 140px;
                box-shadow: none;
            }
            body.dark-theme .fixed-elements {
                box-shadow: none;
            }
            #hitokoto {
                margin: 3px 0 6px 0;
                font-size: 12px;
                line-height: 1.3;
                padding: 0 8px;
            }
            .category-buttons-container {
                width: 100%;
                max-width: none;
                padding: 6px;
                overflow-x: auto;
                flex-wrap: nowrap;
                justify-content: center;
                margin: 8px auto 5px;
                scrollbar-width: none;
                -ms-overflow-style: none;
                background-color: transparent;
                border-radius: 8px;
                gap: 4px;
            }
            body.dark-theme .category-buttons-container {
                background-color: transparent;
            }
            .category-button {
                padding: 4px 8px;
                font-size: 11px;
                margin: 0 1px;
                flex: 0 0 auto;
                white-space: nowrap;
            }
            .content {
                margin-top: 175px;
                margin-bottom: 100px;
                padding: 15px;
                transition: opacity 0.3s ease;
            }
            .center-content {
                position: static;
                transform: none;
                width: 100%;
                text-align: center;
                padding: 0 8px;
            }
            .loading .content {
                opacity: 0.6;
            }
            .search-container {
                margin-top: 15px;
            }
            .search-bar {
                flex-wrap: nowrap;
                max-width: 320px;
                width: 90%;
                margin: 6px auto 8px auto;
            }
            .search-bar select {
                width: 80px;
                flex: 0 0 auto;
                font-size: 12px;
            }
            .search-bar input {
                flex: 1;
            }
            .search-bar button {
                flex: 0 0 auto;
            }
            .admin-controls input,
            .admin-controls button {
                height: 36px;
                padding: 0 10px;
                font-size: 14px;
            }
            .card-container {
                display: grid;
                grid-template-columns: repeat(2, minmax(140px, 1fr));
                column-gap: 20px;
                row-gap: 10px;
                justify-content: center;
                padding: 12px;
                margin: 0 auto;
            }
            .card {
                width: auto;
                max-width: 100%;
                padding: 12px;
                margin: 0;
                border-radius: 8px;
            }
            .card-title {
                font-size: 13px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
            }
            .card-url {
                font-size: 11px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
            }
            .add-remove-controls {
                right: 10px;
                bottom: 125px;
                top: auto;
                left: auto;
                transform: none;
                flex-direction: column;
                gap: 15px;
            }
            .round-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                font-size: 20px;
            }
            .floating-button-group {
                bottom: 20px;
                right: 10px;
            }
            .floating-button-group button {
                width: 36px;
                height: 36px;
                font-size: 18px;
            }
            #dialog-box {
                width: 90%;
                max-width: 350px;
                padding: 20px;
            }
            .section-title {
                font-size: 20px;
                min-width: 100px;
            }
            .card-actions {
                top: -10px;
                right: -10px;
            }
            .card-btn {
                width: 32px;
                height: 32px;
            }
            .card-btn svg {
                width: 18px;
                height: 18px;
            }
            .fixed-elements {
                display: block;
                padding: 10px;
                height: auto !important;
            }
            .fixed-elements h3 {
                position: absolute;
                top: 12px;
                left: 15px;
                margin: 0;
                font-size: 18px;
                font-weight: bold;
            }
            .top-right-controls {
                position: absolute;
                top: 10px;
                right: 10px;
                margin: 0;
                gap: 8px;
                flex-wrap: nowrap;
            }
            .top-right-controls .admin-btn,
            .top-right-controls .login-btn {
                padding: 5px 8px;
                font-size: 12px;
            }
            .top-right-controls .bookmark-search-toggle {
                width: 30px;
                height: 30px;
            }
            .top-right-controls .bookmark-search-toggle svg {
                width: 16px;
                height: 16px;
            }
            .center-content {
                position: static !important;
                transform: none !important;
                width: 100%;
                padding: 0 10px;
                margin-top: 40px;
            }
            .search-container {
                width: 100%;
                margin-top: 6px;
            }
            .search-bar {
                max-width: 100%;
                flex-wrap: nowrap;
            }
        }

        .card-click-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            display: none;
            border-radius: 8px;
            overflow: hidden;
        }

        .admin-mode .card-click-overlay {
            display: flex;
        }

        .card-edit-zone,
        .card-delete-zone {
            width: 50%;
            height: 100%;
            cursor: pointer;
            position: relative;
            transition: background-color 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .card-edit-zone {
            background-color: rgba(67, 184, 131, 0.2);
        }

        .card-delete-zone {
            background-color: rgba(231, 76, 60, 0.2);
        }

        .card-edit-zone:hover {
            background-color: rgba(67, 184, 131, 0.4);
        }

        .card-delete-zone:hover {
            background-color: rgba(231, 76, 60, 0.4);
        }

        .card-edit-zone::after,
        .card-delete-zone::after {
            content: '';
            width: 28px;
            height: 28px;
            opacity: 0.7;
            transition: opacity 0.2s ease;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }

        .card-edit-zone:hover::after,
        .card-delete-zone:hover::after {
            opacity: 1;
        }

        .card-edit-zone::after {
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>');
        }

        .card-delete-zone::after {
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>');
        }

        .dialog-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }

        .dialog-box {
            background-color: #ffffff;
            padding: 24px;
            border-radius: 12px;
            width: 340px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transform: translateY(-20px);
            animation: slideUp 0.3s ease forwards;
        }

        .dialog-title {
            margin: 0 0 15px 0;
            font-size: 18px;
            color: #333;
        }

        .dialog-content {
            padding: 15px 0;
            margin-bottom: 16px;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
        }

        .dialog-box input[type="text"] {
            width: 100%;
            margin-bottom: 16px;
            padding: 10px 12px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.2s;
            box-sizing: border-box;
            background-color: #ffffff !important;
        }

        .dialog-box input[type="text"]:focus {
            border-color: #4a90e2 !important;
            outline: none;
            box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
        }

        .dialog-buttons {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        .dialog-box button {
            padding: 8px 16px;
            border-radius: 6px;
            border: none;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .dialog-confirm-btn {
            background-color: #43b883;
            color: white;
        }

        .dialog-confirm-btn:hover {
            background-color: #3aa876;
        }

        .dialog-cancel-btn {
            background-color: #f0f0f0;
            color: #555;
        }

        .dialog-cancel-btn:hover {
            background-color: #e0e0e0;
        }

        .top-z-index {
            z-index: 9999;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes slideUp {
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        body.dark-theme .dialog-box {
            background-color: #2d3748;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        body.dark-theme .dialog-title {
            color: #f8f9fa;
        }

        body.dark-theme .dialog-content {
            color: #f8f9fa;
        }

        body.dark-theme .dialog-box input[type="text"] {
            background-color: #3c4658 !important;
            color: #e3e3e3 !important;
            border-color: #4a5568 !important;
        }

        body.dark-theme .dialog-box input[type="text"]:focus {
            border-color: #5a9cec !important;
            box-shadow: 0 0 0 3px rgba(90, 156, 236, 0.3);
        }

        body.dark-theme .dialog-cancel-btn {
            background-color: #4a5568;
            color: #e3e3e3;
        }

        body.dark-theme .dialog-cancel-btn:hover {
            background-color: #3c4658;
        }

        body.dark-theme .dialog-confirm-btn {
            background-color: #5d7fb9;
            color: white;
        }

        body.dark-theme .dialog-confirm-btn:hover {
            background-color: #5473a9;
        }

        #loading-mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 7000;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .loading-content {
            background-color: #fff;
            padding: 20px 40px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 0 10px #0003;
            font-size: 16px;
            color: #333;
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #ccc;
            border-top-color: #3498db;
            border-radius: 50%;
            margin: 0 auto 10px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        body.dark-theme .loading-content {
            background-color: #2d3748;
            color: #f8f9fa;
        }

        .edit-category-btn,
        .delete-category-btn,
        .move-category-btn {
            color: white;
            border: none;
            margin-left: 8px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s;
            width: 30px;
            height: 30px;
            padding: 0;
            font-size: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .move-category-btn {
            padding: 0;
            min-width: auto;
        }

        .move-category-btn svg {
            width: 20px;
            height: 20px;
            fill: white;
        }

        .edit-category-btn {
            background-color: #43b883;
        }

        .delete-category-btn {
            background-color: #e74c3c;
        }

        .move-category-btn {
            background-color: #5d7fb9;
        }

        .edit-category-btn:hover {
            background-color: #3aa876;
        }

        .delete-category-btn:hover {
            background-color: #c0392b;
        }

        .move-category-btn:hover {
            background-color: #5473a9;
        }

        body.dark-theme .edit-category-btn {
            background-color: #5d7fb9;
        }

        body.dark-theme .edit-category-btn:hover {
            background-color: #5473a9;
        }

        body.dark-theme .move-category-btn {
            background-color: #43b883;
        }

        body.dark-theme .move-category-btn:hover {
            background-color: #3aa876;
        }

        body.dark-theme .delete-category-btn {
            background-color: #e74c3c;
        }

        body.dark-theme .delete-category-btn:hover {
            background-color: #c0392b;
        }

        .add-btn {
            order: 1;
        }

        .category-add-btn {
            order: 3;
        }

        .category-manage-btn {
            order: 4;
        }

        .backup-manage-btn {
            order: 5;
        }

        .category-manage-btn.active {
            background-color: #e74c3c;
        }

        .category-manage-btn.active:hover {
            background-color: #c0392b;
        }

        .card-tip {
            font-size: 12px;
            color: #666;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 14px;
            max-height: 28px;
            margin-top: 5px;
        }

        body.dark-theme .card-tip {
            color: #a0a0a0;
        }

        #custom-tooltip {
            position: absolute;
            display: none;
            z-index: 700;
            background: #43b883;
            color: #fff;
            padding: 6px 10px;
            border-radius: 5px;
            font-size: 12px;
            pointer-events: none;
            max-width: 300px;
            white-space: pre-wrap;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            transition: opacity 0.2s ease;
        }

        body.dark-theme #custom-tooltip {
            background: #5d7fb9;
            color: #fff;
        }

        @media (hover: hover) and (pointer: fine) {
            .card:hover {
                transform: scale(1.05);
                box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
            }
        }

        .backup-modal-content {
            background-color: white;
            padding: 0;
            border-radius: 12px;
            width: 90%;
            max-width: 550px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            animation: dialogFadeIn 0.3s ease;
            overflow: hidden;
        }

        .backup-modal-header {
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
        }

        .backup-modal-header h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
        }

        .backup-modal-header p {
            margin: 5px 0 0;
            font-size: 12px;
            color: #888;
        }

        .backup-modal-main {
            padding: 15px 20px;
        }

        .backup-info-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f8f9fa;
            padding: 10px 15px;
            border-radius: 6px;
            margin-bottom: 15px;
        }

        .backup-info-bar p {
            margin: 0;
            font-size: 13px;
            color: #555;
        }

        .backup-info-bar button {
            background-color: #43b883;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 13px;
            transition: all 0.2s;
        }

        .backup-info-bar button:hover {
            background-color: #3aa876;
        }

        .backup-list-container {
            max-height: 250px;
            overflow-y: auto;
            border: 1px solid #eee;
            border-radius: 6px;
            padding: 5px;
        }

        .backup-list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #f0f0f0;
            font-size: 14px;
        }

        .backup-list-item:last-child {
            border-bottom: none;
        }

        .backup-list-item .timestamp {
            color: #333;
        }

        .backup-list-item .actions a {
            color: #007bff;
            text-decoration: none;
            margin-left: 15px;
            cursor: pointer;
            font-size: 13px;
        }

        .backup-list-item .actions a:hover {
            text-decoration: underline;
        }

        .backup-list-item .actions .delete-backup-btn {
            color: #e74c3c;
            margin-left: 8px;
            font-size: 16px;
            vertical-align: middle;
            transition: transform 0.2s;
        }

        .backup-list-item .actions .delete-backup-btn:hover {
            transform: scale(1.1);
        }

        .backup-modal-footer {
            padding: 15px 20px;
            text-align: right;
            border-top: 1px solid #eee;
        }

        .backup-modal-footer button {
            background-color: #6c757d;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .backup-modal-footer button:hover {
            background-color: #5a6268;
        }

        body.dark-theme .backup-modal-content {
            background-color: #2d3748;
        }

        body.dark-theme .backup-modal-header {
            border-bottom-color: #4a5568;
        }

        body.dark-theme .backup-modal-header h3 {
            color: #f8f9fa;
        }

        body.dark-theme .backup-modal-header p {
            color: #a0aec0;
        }

        body.dark-theme .backup-info-bar {
            background-color: #1a202c;
        }

        body.dark-theme .backup-info-bar p {
            color: #e2e8f0;
        }

        body.dark-theme .backup-info-bar button {
            background-color: #5d7fb9;
        }

        body.dark-theme .backup-info-bar button:hover {
            background-color: #5473a9;
        }

        body.dark-theme .backup-list-container {
            border-color: #4a5568;
        }

        body.dark-theme .backup-list-item {
            border-bottom-color: #4a5568;
        }

        body.dark-theme .backup-list-item .timestamp {
            color: #f8f9fa;
        }

        body.dark-theme .backup-list-item .actions a {
            color: #63b3ed;
        }

        body.dark-theme .backup-modal-footer {
            border-top-color: #4a5568;
        }
    </style>
</head>

<body>
    <div class="fixed-elements">
        <h3>寂静导航</h3>
        <div class="center-content">
            <p id="hitokoto">
                <a href="#" id="hitokoto_text"></a>
            </p>
            <script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
            <div class="search-container">
                <div class="search-bar">
                    <select id="search-engine-select">
                        <option value="SearXNG">SearXNG</option>
                        <option value="baidu">百度</option>
                        <option value="bing">必应</option>
                        <option value="google">谷歌</option>
                        <option value="duckduckgo">DuckDuckGo</option>
                    </select>
                    <input type="text" id="search-input" placeholder="">
                    <button id="search-button">🔍</button>
                </div>
            </div>
            <div id="category-buttons-container" class="category-buttons-container"></div>
        </div>
        <div class="top-right-controls">
            <button class="admin-btn" id="admin-btn" onclick="toggleAdminMode()" style="display: none;">设置</button>
            <button class="login-btn" id="login-btn" onclick="handleLoginClick()">登录</button>
            <div class="bookmark-search-toggle" onclick="toggleBookmarkSearch()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <div class="bookmark-search-dropdown" id="bookmark-search-dropdown">
                <input type="text" id="bookmark-search-input" placeholder="搜索书签...">
            </div>
        </div>
        </div>
    </div>
    <div class="content">
        <div class="add-remove-controls">
            <button id="add-btn" class="round-btn add-btn" onclick="showAddDialog()" title="添加链接">
                <svg viewBox="0 0 48 48" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 6H8a2 2 0 0 0-2 2v8M16 42H8a2 2 0 0 1-2-2v-8M32 42h8a2 2 0 0 0 2-2v-8M32 6h8a2 2 0 0 1 2 2v8" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    <path d="M32 24H16M24 16v16" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                </svg>
            </button>

            <button id="category-add-btn" class="round-btn category-add-btn" onclick="addCategory()" title="添加分类">
                <svg viewBox="0 0 48 48" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 8c0-1.1.9-2 2-2h12l5 6h17c1.1 0 2 .9 2 2v26c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8Z" stroke="white" stroke-width="4" stroke-linejoin="round" fill="none"/>
                    <path d="M18 27h12M24 21v12" stroke="white" stroke-width="4" stroke-linecap="round"/>
                </svg>
            </button>

            <button id="export-btn" class="round-btn export-btn" onclick="exportBookmarks()" title="导出书签" style="display:none;">
                <svg viewBox="0 0 48 48" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4v28M12 20l12 12 12-12" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    <path d="M6 40h36" stroke="white" stroke-width="4" stroke-linecap="round"/>
                </svg>
            </button>

            <button id="import-btn" class="round-btn import-btn" onclick="handleImportClick()" title="导入书签" style="display:none;">
                <svg viewBox="0 0 48 48" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 44V16M12 28l12-12 12 12" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    <path d="M6 8h36" stroke="white" stroke-width="4" stroke-linecap="round"/>
                </svg>
            </button>
            <button id="backup-manage-btn" class="round-btn backup-manage-btn" onclick="showBackupManager()" title="备份与恢复">
                <svg viewBox="0 0 48 48" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4v6m0 28v6M10.343 10.343l4.243 4.243M33.414 33.414l4.243 4.243M4 24h6m28 0h6m-33.657 9.172-4.243 4.242M43.657 10.343l-4.243 4.243" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M37 24a13 13 0 1 1-26 0 13 13 0 0 1 26 0Z" stroke="white" stroke-width="4"/>
                    <path d="M24 18v7h6" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>

        <div id="sections-container"></div>
        <div class="floating-button-group">
            <button id="back-to-top-btn" onclick="scrollToTop()" style="display: none;">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 24l12-12 12 12m-24 12 12-12 12 12" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button id="theme-toggle" onclick="toggleTheme()">◑</button>
        </div>
        <div id="dialog-overlay">
            <div id="dialog-box">
                <label for="name-input">名称</label>
                <input type="text" id="name-input" placeholder="必填">
                <label for="url-input">地址</label>
                <input type="text" id="url-input" placeholder="必填">
                <label for="tips-input">描述</label>
                <input type="text" id="tips-input" placeholder="可选">
                <label for="icon-input">图标</label>
                <input type="text" id="icon-input" placeholder="可选">
                <label for="category-select">选择分类</label>
                <select id="category-select"></select>
                <div class="private-link-container">
                    <label for="private-checkbox">私密链接</label>
                    <input type="checkbox" id="private-checkbox">
                </div>
                <div class="dialog-buttons">
                    <button class="dialog-cancel-btn" id="dialog-cancel-btn">取消</button>
                    <button class="dialog-confirm-btn" id="dialog-confirm-btn">确定</button>
                </div>
            </div>
        </div>
        <div id="login-modal" class="login-modal">
            <div class="login-modal-content">
                <h3>登录</h3>
                <input type="password" id="login-password" placeholder="请输入密码">
                <div class="login-modal-buttons">
                    <button class="cancel" onclick="hideLoginModal()">取消</button>
                    <button onclick="performLogin()">确定</button>
                </div>
            </div>
        </div>

        <div class="dialog-overlay top-z-index" id="custom-alert-overlay" style="display: none;">
            <div class="dialog-box" id="custom-alert-box">
                <h3 class="dialog-title" id="custom-alert-title">提示</h3>
                <div class="dialog-content" id="custom-alert-content">这里是提示内容</div>
                <div class="dialog-buttons">
                    <button class="dialog-confirm-btn" id="custom-alert-confirm">确定</button>
                </div>
            </div>
        </div>

        <div class="dialog-overlay top-z-index" id="custom-confirm-overlay" style="display: none;">
            <div class="dialog-box">
                <div class="dialog-content" id="custom-confirm-message"></div>
                <div class="dialog-buttons">
                    <button id="custom-confirm-cancel" class="dialog-cancel-btn">取消</button>
                    <button id="custom-confirm-ok" class="dialog-confirm-btn">确定</button>
                </div>
            </div>
        </div>

        <div class="dialog-overlay" id="category-dialog" style="display: none;">
            <div class="dialog-box">
                <h3 id="category-dialog-title" class="dialog-title">新建分类</h3>
                <input type="text" id="category-name-input" class="category-dialog-input" placeholder="请输入分类名称">
                <div class="dialog-buttons">
                    <button id="category-cancel-btn" class="dialog-cancel-btn">取消</button>
                    <button id="category-confirm-btn" class="dialog-confirm-btn">确定</button>
                </div>
            </div>
        </div>

        <div class="dialog-overlay" id="backup-modal-overlay" style="display: none; z-index: 3000;">
            <div class="backup-modal-content">
                <div class="backup-modal-header">
                    <h3>历史备份节点列表</h3>
                    <p>我们为您在云端最多保留10个历史备份节点。云端历史备份需要登录后进入设置模式进行手动管理。</p>
                </div>
                <div class="backup-modal-main">
                    <div class="backup-info-bar">
                        <p id="last-backup-time">上次备份时间: 暂无</p>
                        <button id="backup-now-btn" onclick="handleManualBackup()">🚀 立即备份</button>
                    </div>
                    <h4>云端历史备份节点</h4>
                    <div id="backup-list-container" class="backup-list-container">
                        <div style="text-align:center; padding: 20px; color: #888;">加载中...</div>
                    </div>
                </div>
                <div class="backup-modal-footer">
                    <button onclick="hideBackupManager()">关闭</button>
                </div>
            </div>
        </div>

        <div id="loading-mask" style="display:none;">
            <div class="loading-content">
                <div class="spinner"></div>
                <p>加载中，请稍候...</p>
            </div>
        </div>
    </div>
    <div id="custom-tooltip"></div>

    <script>
    // 【新增】立即执行函数，用于在页面加载时快速应用主题，防止闪烁
    (function() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
        }
    })();

    // 搜索引擎配置
    const searchEngines = {
        SearXNG: "https://ss.ayang.nyc.mn/search?q=",
        baidu: "https://www.baidu.com/s?wd=",
        bing: "https://www.bing.com/search?q=",
        google: "https://www.google.com/search?q=",
        duckduckgo: "https://duckduckgo.com/?q="
    };

    // 【修改】初始值现在从 localStorage 读取，如果不存在则默认为 "SearXNG"
    let currentEngine = localStorage.getItem('lastSelectedSearchEngine') || "SearXNG";

    // 日志记录函数
    function logAction(action, details) {
        const timestamp = new Date().toISOString();
        const logEntry = timestamp + ': ' + action + ' - ' + JSON.stringify(details);
        console.log(logEntry);
    }

    // 设置当前搜索引擎
    function setActiveEngine(engine) {
        currentEngine = engine;
        document.getElementById('search-engine-select').value = engine;
        // 【新增】将当前选择的搜索引擎保存到 localStorage
        localStorage.setItem('lastSelectedSearchEngine', engine);
        logAction('设置搜索引擎', { engine });
    }

    // 搜索引擎选择框变更事件
    document.getElementById('search-engine-select').addEventListener('change', function() {
        setActiveEngine(this.value);
    });

    // 搜索按钮点击事件 (保持不变)
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value;
        if (query) {
            logAction('执行搜索', { engine: currentEngine, query });
            window.open(searchEngines[currentEngine] + encodeURIComponent(query), '_blank');
        }
    });

    // 搜索输入框回车事件 (保持不变)
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('search-button').click();
        }
    });
    // 初始化搜索引擎
    setActiveEngine(currentEngine);

    // 全局变量
    let publicLinks = [];
    let privateLinks = [];
    let isAdmin = false;
    let isLoggedIn = false;
    let removeMode = false;
    let isRemoveCategoryMode = false;
    let isEditCategoryMode = false;
    // 【修改】让 isDarkTheme 的初始状态直接从 localStorage 读取
    let isDarkTheme = localStorage.getItem('theme') === 'dark';
    let links = [];
    const categories = {};

    // 添加新分类
    async function addCategory() {
        if (!await validateToken()) {
            return;
        }
        const categoryName = await showCategoryDialog('请输入新分类名称');
        if (categoryName && !categories[categoryName]) {
            categories[categoryName] = [];
            updateCategorySelect();
            renderSections();
            saveLinks();
            logAction('添加分类', { categoryName, currentLinkCount: links.length });
        } else if (categories[categoryName]) {
            await customAlert('该分类已存在', '添加分类');
            logAction('添加分类失败', { categoryName, reason: '分类已存在' });
        }
    }

    // 删除分类
    async function deleteCategory(category) {
        if (!await validateToken()) {
            return;
        }
        const message = '确定要删除 "' + category + '" 分类吗？这将删除该分类下的所有链接。';
        const confirmed = await customConfirm(message, '确定', '取消');

        if (confirmed) {
            delete categories[category];
            links = links.filter(link => link.category !== category);
            publicLinks = publicLinks.filter(link => link.category !== category);
            privateLinks = privateLinks.filter(link => link.category !== category);
            updateCategorySelect();
            renderSections();
            renderCategoryButtons();
            saveLinks();
            logAction('删除分类', { category });
        }
    }

    // 编辑分类名称
    async function editCategoryName(oldName) {
        if (!await validateToken()) return;

        const newName = await showCategoryDialog('请输入新的分类名称', oldName);
        if (!newName || newName === oldName) return;

        if (categories[newName]) {
            await customAlert('该名称已存在，请重新命名', '编辑分类');
            return;
        }

        // 1. 重命名分类对象，并保持原有顺序
const newCategories = {};
Object.keys(categories).forEach(key => {
    if (key === oldName) {
        newCategories[newName] = categories[oldName];
    } else {
        newCategories[key] = categories[key];
    }
});

// 清空并用新顺序重新填充 categories 对象
Object.keys(categories).forEach(key => delete categories[key]);
Object.assign(categories, newCategories);

        // 2. 更新所有链接的 category 字段
        [...publicLinks, ...privateLinks].forEach(link => {
            if (link.category === oldName) {
                link.category = newName;
            }
        });

        links.forEach(link => {
            if (link.category === oldName) {
                link.category = newName;
            }
        });

        // 3. 保存并刷新
        renderSections();
        renderCategoryButtons();
        updateCategorySelect();
        saveLinks();

        logAction('编辑分类名称', { oldName, newName });
    }

    // 移动分类
    async function moveCategory(categoryName, direction) {
        if (!await validateToken()) {
            return;
        }
        const keys = Object.keys(categories);
        const index = keys.indexOf(categoryName);
        if (index < 0) return;

        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= keys.length) return;

        // 重建一个新顺序的 categories 对象
        const newCategories = {};
        const reordered = [...keys];
        [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
        reordered.forEach(key => {
            newCategories[key] = categories[key];
        });

        // 替换原有 categories 并重渲染
        Object.keys(categories).forEach(k => delete categories[k]);
        Object.assign(categories, newCategories);

        renderSections();
        renderCategoryButtons();
        updateCategorySelect();
        saveLinks();

        logAction('移动分类', { categoryName, direction });
    }

    // 切换分类编辑模式
    function toggleEditCategory() {
        isEditCategoryMode = !isEditCategoryMode;

        const deleteButtons = document.querySelectorAll('.delete-category-btn');
        const editButtons = document.querySelectorAll('.edit-category-btn');
        const moveButtons = document.querySelectorAll('.move-category-btn');

        deleteButtons.forEach(btn => {
            btn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
        });

        editButtons.forEach(btn => {
            btn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
        });

        moveButtons.forEach(btn => {
            btn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
        });

        // 更新分类管理按钮的样式以显示当前状态
        const manageButton = document.querySelector('.category-manage-btn');
        if (manageButton) {
            if (isEditCategoryMode) {
                manageButton.classList.add('active');
            } else {
                manageButton.classList.remove('active');
            }
        }

        // 给用户提示 - 暂时使用console.log避免阻塞
        if (isEditCategoryMode) {
            console.log('分类编辑模式已开启');
        } else {
            console.log('分类编辑模式已关闭');
        }

        logAction('切换分类编辑模式', { isEditCategoryMode });
    }



    // 渲染分类快捷按钮
    function renderCategoryButtons() {
        // 如果正在显示搜索结果，不重新渲染分类按钮
        if (isShowingSearchResults) {
            return;
        }

        const buttonsContainer = document.getElementById('category-buttons-container');
        buttonsContainer.innerHTML = '';

        // 只有当有分类时才显示按钮容器
        if (Object.keys(categories).length > 0) {
            // 获取页面上实际显示的分类顺序（只从sections-container中获取，不包括搜索结果）
            const displayedCategories = [];
            document.querySelectorAll('#sections-container .section-title').forEach(titleElement => {
                displayedCategories.push(titleElement.textContent);
            });

            // 创建按钮并添加到容器
            let visibleButtonsCount = 0;
            displayedCategories.forEach(category => {
                // 检查该分类是否有可见的链接
                const visibleLinks = links.filter(function(link) {
                    return link.category === category && (!link.isPrivate || isLoggedIn);
                });

                // 只为有可见链接的分类创建按钮
                if (visibleLinks.length > 0) {
                    const button = document.createElement('button');
                    button.className = 'category-button';
                    button.textContent = category;
                    button.dataset.category = category;
                    button.onclick = () => {
                        // 如果正在显示搜索结果，先隐藏搜索结果
                        if (isShowingSearchResults) {
                            hideSearchResults();
                        }

                        // 清除所有按钮的active类
                        document.querySelectorAll('.category-button').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        // 为当前点击的按钮添加active类
                        button.classList.add('active');
                        scrollToCategory(category);
                    };

                    buttonsContainer.appendChild(button);
                    visibleButtonsCount++;
                }
            });

            // 显示或隐藏按钮容器
            if (visibleButtonsCount > 0) {
                buttonsContainer.style.display = 'flex';
            } else {
                buttonsContainer.style.display = 'none';
            }

            // 初始时检测当前可见分类并设置相应按钮为活跃状态
            setTimeout(setActiveCategoryButtonByVisibility, 100);
        } else {
            buttonsContainer.style.display = 'none';
        }
    }

    // 根据可见性设置活跃的分类按钮
    function setActiveCategoryButtonByVisibility() {
        // 如果正在显示搜索结果，不更新分类按钮的活跃状态
        if (isShowingSearchResults) {
            return;
        }

        // 获取所有分类区域
        const sections = document.querySelectorAll('.section');
        if (!sections.length) return;

        // 获取视窗高度
        const viewportHeight = window.innerHeight;
        // 考虑固定元素的高度
        const fixedElementsHeight = 170;
        // 计算视窗中心点
        const viewportCenter = viewportHeight / 2 + fixedElementsHeight;

        // 找出最接近视窗中心的分类
        let closestSection = null;
        let closestDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // 计算分类区域的中心点
            const sectionCenter = rect.top + rect.height / 2;
            // 计算到视窗中心的距离
            const distance = Math.abs(sectionCenter - viewportCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
            }
        });

        if (closestSection) {
            const cardContainer = closestSection.querySelector('.card-container');
            if (cardContainer && cardContainer.id) {
                const categoryId = cardContainer.id;
                const buttons = document.querySelectorAll('.category-button');

                // 移除所有活跃状态
                buttons.forEach(btn => btn.classList.remove('active'));

                // 为匹配的分类按钮添加活跃状态
                buttons.forEach(btn => {
                    if (btn.dataset.category === categoryId) {
                        btn.classList.add('active');
                    }
                });
            }
        }
    }

    // 添加滚动事件监听器，滚动时更新活跃的分类按钮
    window.addEventListener('scroll', debounce(setActiveCategoryButtonByVisibility, 100));

    // 防抖函数，避免过多的滚动事件处理
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }

    // 滚动到指定分类
    function scrollToCategory(category) {
        const section = document.getElementById(category);
        if (section) {
            // 计算滚动位置，考虑顶部固定元素的高度和额外偏移量
            let offset = 230; // 减小偏移量，确保分类标题和第一行书签完全可见

            // 检查是否为移动设备
            if (window.innerWidth <= 480) {
                offset = 120; // 移动设备上的偏移量
            }

            // 滚动到分类位置
            const sectionRect = section.getBoundingClientRect();
            const absoluteTop = window.pageYOffset + sectionRect.top - offset;

            // 使用平滑滚动效果
            window.scrollTo({
                top: absoluteTop,
                behavior: 'smooth'
            });

            logAction('滚动到分类', { category });
        }
    }

    // 读取链接数据
    async function loadLinks() {
        const headers = {
            'Content-Type': 'application/json'
        };

        // 如果已登录，从 localStorage 获取 token 并添加到请求头
        if (isLoggedIn) {
            const token = localStorage.getItem('authToken');
            if (token) {
                headers['Authorization'] = token;
            }
        }

        try {
            const response = await fetch('/api/getLinks?userId=testUser', {
                headers: headers
            });

            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }


            const data = await response.json();
            console.log('Received data:', data);

            if (data.categories) {
                // 先清空当前的所有分类
                Object.keys(categories).forEach(key => delete categories[key]);
                // 然后再加载恢复的正确分类
                Object.assign(categories, data.categories);
            }

            publicLinks = data.links ? data.links.filter(link => !link.isPrivate) : [];
            privateLinks = data.links ? data.links.filter(link => link.isPrivate) : [];
            links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

            renderSections();
            updateCategorySelect();
            updateUIState();
            logAction('读取链接', {
                publicCount: publicLinks.length,
                privateCount: privateLinks.length,
                isLoggedIn: isLoggedIn,
                hasToken: !!localStorage.getItem('authToken')
            });
        } catch (error) {
            // 🔧 安全修复：避免泄露详细错误信息
            console.error('Failed to load links');
            console.error('加载链接时出错，请刷新页面重试');
        }
    }


    // 更新UI状态
function updateUIState() {
    const addRemoveControls = document.querySelector('.add-remove-controls');
    // 获取导出和导入按钮的元素，这样我们才能控制它们显示或隐藏
    const exportBtn = document.getElementById('export-btn'); // 导出按钮
    const importBtn = document.getElementById('import-btn'); // 导入按钮
    // --- 新增 ---
    const backupBtn = document.getElementById('backup-manage-btn'); // 备份管理按钮

    if (isAdmin) { // 如果当前是管理员模式
        addRemoveControls.style.display = 'flex'; // 显示管理员操作区域
        // ⭐ 重点修改：在管理员模式下显示导出和导入按钮
        if (exportBtn) exportBtn.style.display = 'flex'; // 检查按钮是否存在，然后显示它
        if (importBtn) importBtn.style.display = 'flex'; // 检查按钮是否存在，然后显示它
        if (backupBtn) backupBtn.style.display = 'flex'; // 显示备份管理按钮
    } else { // 如果不是管理员模式
        addRemoveControls.style.display = 'none'; // 隐藏管理员操作区域
        // ⭐ 重点修改：在非管理员模式下隐藏导出和导入按钮
        if (exportBtn) exportBtn.style.display = 'none';
        if (importBtn) importBtn.style.display = 'none';
        if (backupBtn) backupBtn.style.display = 'none'; // 隐藏备份管理按钮
    }

    // 同时更新登录和设置按钮状态（这部分是您代码中已有的）
    updateLoginButton();

    logAction('更新UI状态', { isAdmin, isLoggedIn });
}

    // 登录状态显示（加载所有链接）
    function showSecretGarden() {
        if (isLoggedIn) {
            links = [...publicLinks, ...privateLinks];
            renderSections();
            // 显示所有私密标签
            document.querySelectorAll('.private-tag').forEach(tag => {
                tag.style.display = 'block';
            });
            logAction('显示私密花园');
        }
    }

    // 渲染分类和链接
    function renderSections() {
        const container = document.getElementById('sections-container');
        container.innerHTML = '';

        Object.keys(categories).forEach(category => {
            const section = document.createElement('div');
            section.className = 'section';

            const titleContainer = document.createElement('div');
            titleContainer.className = 'section-title-container';

            const title = document.createElement('div');
            title.className = 'section-title';
            title.textContent = category;

            titleContainer.appendChild(title);

            if (isAdmin) {
                const editBtn = document.createElement('button');
                editBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
editBtn.title = '编辑名称';
                editBtn.className = 'edit-category-btn';
                editBtn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
                editBtn.onclick = () => editCategoryName(category);
                titleContainer.appendChild(editBtn);

                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
deleteBtn.title = '删除分类';
                deleteBtn.className = 'delete-category-btn';
                deleteBtn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
                deleteBtn.onclick = () => deleteCategory(category);
                titleContainer.appendChild(deleteBtn);

                const upBtn = document.createElement('button');
                upBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6l-6 6h4v6h4v-6h4z"/></svg>';
                upBtn.className = 'move-category-btn';
                upBtn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
                upBtn.onclick = () => moveCategory(category, -1);
                titleContainer.appendChild(upBtn);

                const downBtn = document.createElement('button');
                downBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18l6-6h-4v-6h-4v6h-4z"/></svg>';
                downBtn.className = 'move-category-btn';
                downBtn.style.display = isEditCategoryMode ? 'inline-block' : 'none';
                downBtn.onclick = () => moveCategory(category, 1);
                titleContainer.appendChild(downBtn);
            }

            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';
            cardContainer.id = category;

            section.appendChild(titleContainer);
            section.appendChild(cardContainer);

            let privateCount = 0;
            let linkCount = 0;

            links.forEach(link => {
                if (link.category === category) {
                    if (link.isPrivate) privateCount++;
                    linkCount++;
                    createCard(link, cardContainer);
                }
            });

            if (privateCount < linkCount || isLoggedIn) {
                container.appendChild(section);
            }
        });

        // 渲染分类快捷按钮
        renderCategoryButtons();

        logAction('渲染分类和链接', { isAdmin: isAdmin, linkCount: links.length, categoryCount: Object.keys(categories).length });
    }

    // 从URL中提取域名
    function extractDomain(url) {
        let domain;
        try {
            domain = new URL(url).hostname;
        } catch (e) {
            domain = url;
        }
        return domain;
    }

    // URL验证函数
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    // 创建卡片
    // 请用这个新版本完整替换上面的旧函数
    // 【第二步：替换这个函数】
    // 请用下面的新版本，完整地替换掉旧的 createCard 函数
    function createCard(link, container) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('draggable', isAdmin);
        card.dataset.isPrivate = link.isPrivate;
        card.setAttribute('data-url', link.url);

        const cardIndex = container.children.length;
        card.style.setProperty('--card-index', cardIndex);

        const cardTop = document.createElement('div');
        cardTop.className = 'card-top';

        const defaultIconSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>' +
            '<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>' +
            '</svg>';

        const icon = document.createElement('img');
        icon.className = 'card-icon';
        icon.src = (!link.icon || typeof link.icon !== 'string' || !link.icon.trim() || !isValidUrl(link.icon)) ?
            'https://www.faviconextractor.com/favicon/' + extractDomain(link.url) :
            link.icon;
        icon.alt = 'Website Icon';
        icon.onerror = function() {
            const svgBlob = new Blob([defaultIconSVG], { type: 'image/svg+xml' });
            const svgUrl = URL.createObjectURL(svgBlob);
            this.src = svgUrl;
            this.onload = () => URL.revokeObjectURL(svgUrl);
        };

        const title = document.createElement('div');
        title.className = 'card-title';
        title.textContent = link.name;

        cardTop.appendChild(icon);
        cardTop.appendChild(title);

        const url = document.createElement('div');
        url.className = 'card-url';
        url.textContent = link.url;

        card.appendChild(cardTop);
        card.appendChild(url);

        if (link.isPrivate) {
            const privateTag = document.createElement('div');
            privateTag.className = 'private-tag';
            privateTag.textContent = '私密';
            card.appendChild(privateTag);
        }

        // --- 这是本次修改的核心部分 ---
        // 1. 创建覆盖层容器和左右两个点击区域
        const overlay = document.createElement('div');
        overlay.className = 'card-click-overlay';

        const editZone = document.createElement('div');
        editZone.className = 'card-edit-zone';
        editZone.title = '编辑'; // 添加悬浮提示

        const deleteZone = document.createElement('div');
        deleteZone.className = 'card-delete-zone';
        deleteZone.title = '删除'; // 添加悬浮提示

        // 2. 为编辑区域添加点击事件
        editZone.addEventListener('click', (event) => {
            event.stopPropagation(); // 阻止事件冒泡到卡片本身
            if (isAdmin) {
                showEditDialog(link);
            }
        });

        // 3. 为删除区域添加点击事件
        deleteZone.addEventListener('click', (event) => {
            event.stopPropagation(); // 阻止事件冒泡
            if (isAdmin) {
                // 从事件目标找到父级的.card元素，然后传递给删除函数
                const cardElement = event.target.closest('.card');
                if (cardElement) {
                    removeCard(cardElement);
                }
            }
        });

        // 4. 将左右区域添加到覆盖层，再将覆盖层添加到卡片中
        overlay.appendChild(editZone);
        overlay.appendChild(deleteZone);
        card.appendChild(overlay);

        // 为卡片本身添加点击事件，用于非管理模式下打开链接
        const correctedUrl = link.url.startsWith('http://') || link.url.startsWith('https://') ? link.url : 'http://' + link.url;
        card.addEventListener('click', () => {
            // 在非管理模式下，覆盖层是隐藏的，这个事件才会触发
            if (!isAdmin) {
                window.open(correctedUrl, '_blank');
                logAction('打开链接', { name: link.name, url: correctedUrl });
            }
        });

        // 保留原有的提示和拖拽功能
        card.addEventListener('mousemove', (e) => handleTooltipMouseMove(e, link.tips, isAdmin));
        card.addEventListener('mouseleave', handleTooltipMouseLeave);

        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragover', dragOver);
        card.addEventListener('dragend', dragEnd);
        card.addEventListener('drop', drop);

        // 根据当前状态决定是否将卡片添加到容器中
        if (isAdmin || (link.isPrivate && isLoggedIn) || !link.isPrivate) {
            container.appendChild(card);
        }
    }



    // 更新分类选择下拉框
    function updateCategorySelect() {
        const categorySelect = document.getElementById('category-select');
        categorySelect.innerHTML = '';

        Object.keys(categories).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        logAction('更新分类选择', { categoryCount: Object.keys(categories).length });
    }

    // 保存链接数据
    async function saveLinks() {
        if (isAdmin && !(await validateToken())) {
            return;
        }

        let allLinks = [...publicLinks, ...privateLinks];

        try {
            await fetch('/api/saveOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    userId: 'testUser',
                    links: allLinks,
                    categories: categories
                }),
            });
            logAction('保存链接', { linkCount: allLinks.length, categoryCount: Object.keys(categories).length });
        } catch (error) {
            // 🔧 安全修复：避免泄露详细错误信息
            logAction('保存链接失败', { error: 'Save operation failed' });
            console.error('保存链接失败，请重试');
        }
    }

    // 添加卡片弹窗
    async function addLink() {
        if (!await validateToken()) {
            return;
        }
        const name = document.getElementById('name-input').value.trim();
        const url = document.getElementById('url-input').value.trim();
        const tips = document.getElementById('tips-input').value.trim();
        const icon = document.getElementById('icon-input').value.trim();
        const category = document.getElementById('category-select').value;
        const isPrivate = document.getElementById('private-checkbox').checked;

        // 验证必填字段
        if (!name || !url || !category) {
            let errorMessage = '';
            if (!name && !url) {
                errorMessage = '请输入名称和URL';
            } else if (!name) {
                errorMessage = '请输入名称';
            } else if (!url) {
                errorMessage = '请输入URL';
            }

            await customAlert(errorMessage, '添加卡片');
            if (!name) {
                document.getElementById('name-input').focus();
            } else if (!url) {
                document.getElementById('url-input').focus();
            }
            return;
        }

        // 检查URL是否已存在
        const normalizedUrl = url.toLowerCase();
        const allLinks = [...publicLinks, ...privateLinks];
        const isUrlExists = allLinks.some(link => link.url.toLowerCase() === normalizedUrl);

        if (isUrlExists) {
            await customAlert('该URL已存在，请勿重复添加', '添加卡片');
            document.getElementById('url-input').focus();
            return;
        }

        const newLink = { name, url, tips, icon, category, isPrivate };

        if (isPrivate) {
            privateLinks.push(newLink);
        } else {
            publicLinks.push(newLink);
        }

        links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

        if (isAdmin || (isPrivate && isLoggedIn) || !isPrivate) {
            const container = document.getElementById(category);
            if (container) {
                createCard(newLink, container);
            } else {
                categories[category] = [];
                renderSections();
            }
        }

        saveLinks();

        // 清空表单
        document.getElementById('name-input').value = '';
        document.getElementById('url-input').value = '';
        document.getElementById('tips-input').value = '';
        document.getElementById('icon-input').value = '';
        document.getElementById('private-checkbox').checked = false;
        hideAddDialog();

        logAction('添加卡片', { name, url, tips, icon, category, isPrivate });
    }

    // 删除卡片
    async function removeCard(card) {
        if (!await validateToken()) {
            return;
        }
        const name = card.querySelector('.card-title').textContent;
        const url = card.getAttribute('data-url');
        const isPrivate = card.dataset.isPrivate === 'true';

        const confirmed = await customConfirm('确定要删除 "' + name + '" 吗？', '确定', '取消');
        if (!confirmed) {
            return;
        }

        links = links.filter(link => link.url !== url);
        if (isPrivate) {
            privateLinks = privateLinks.filter(link => link.url !== url);
        } else {
            publicLinks = publicLinks.filter(link => link.url !== url);
        }

        for (const key in categories) {
            categories[key] = categories[key].filter(link => link.url !== url);
        }

        card.remove();

        saveLinks();

        logAction('删除卡片', { name, url, isPrivate });
    }

    // 拖拽卡片
    let draggedCard = null;
    let touchStartX, touchStartY;

    // PC端拖拽卡片
    function dragStart(event) {
        if (!isAdmin) {
            event.preventDefault();
            return;
        }
        draggedCard = event.target.closest('.card');
        if (!draggedCard) return;

        draggedCard.classList.add('dragging');
        event.dataTransfer.effectAllowed = "move";
        logAction('开始拖拽卡片', { name: draggedCard.querySelector('.card-title').textContent });
    }

    function dragOver(event) {
        if (!isAdmin) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const target = event.target.closest('.card');
        if (target && target !== draggedCard) {
            const container = target.parentElement;
            const mousePositionX = event.clientX;
            const targetRect = target.getBoundingClientRect();

            if (mousePositionX < targetRect.left + targetRect.width / 2) {
                container.insertBefore(draggedCard, target);
            } else {
                container.insertBefore(draggedCard, target.nextSibling);
            }
        }
    }

    // 清理拖拽状态函数
    function cleanupDragState() {
        if (draggedCard) {
            draggedCard.classList.remove('dragging');
            draggedCard.style.transform = '';
            draggedCard = null;
        }

        document.removeEventListener('touchmove', touchMove);
        document.removeEventListener('touchend', touchEnd);

        touchStartX = null;
        touchStartY = null;
    }

    // PC端拖拽结束
    function drop(event) {
        if (!isAdmin) {
            event.preventDefault();
            return;
        }
        event.preventDefault();

        const card = draggedCard;
        const targetCategory = event.target.closest('.card-container').id;

        validateToken().then(isValid => {
            if (isValid && card) {
                updateCardCategory(card, targetCategory);
                saveCardOrder().catch(error => {
                    console.error('Save failed:', error);
                });
            }
            cleanupDragState();
        });
    }

    function dragEnd(event) {
        if (draggedCard) {
            draggedCard.classList.remove('dragging');
            logAction('拖拽卡片结束');
        }
    }

    // 更新卡片分类
    function updateCardCategory(card, newCategory) {
        const cardTitle = card.querySelector('.card-title').textContent;
        const cardUrl = card.getAttribute('data-url');
        const isPrivate = card.dataset.isPrivate === 'true';

        const linkIndex = links.findIndex(link => link.url === cardUrl);
        if (linkIndex !== -1) {
            links[linkIndex].category = newCategory;
        }

        const linkArray = isPrivate ? privateLinks : publicLinks;
        const arrayIndex = linkArray.findIndex(link => link.url === cardUrl);
        if (arrayIndex !== -1) {
            linkArray[arrayIndex].category = newCategory;
        }

        card.dataset.category = newCategory;
    }

    // 在页面加载完成后添加触摸事件监听器
    document.addEventListener('DOMContentLoaded', function() {
        const cardContainers = document.querySelectorAll('.card-container');
        cardContainers.forEach(container => {
            container.addEventListener('touchstart', touchStart, { passive: false });
        });
    });

    // 保存卡片顺序
    async function saveCardOrder() {
        if (!await validateToken()) {
            return;
        }
        const containers = document.querySelectorAll('.card-container');
        let newPublicLinks = [];
        let newPrivateLinks = [];
        let newCategories = {};

        containers.forEach(container => {
            const category = container.id;
            newCategories[category] = [];

            [...container.children].forEach(card => {
                const url = card.getAttribute('data-url');
                const name = card.querySelector('.card-title').textContent;
                const isPrivate = card.dataset.isPrivate === 'true';
                card.dataset.category = category;

                // 从原始链接数据中获取描述和图标信息
                const originalLink = links.find(link => link.url === url);
                const tips = originalLink?.tips || '';
                const icon = originalLink?.icon || '';

                const link = { name, url, tips, icon, category, isPrivate };
                if (isPrivate) {
                    newPrivateLinks.push(link);
                } else {
                    newPublicLinks.push(link);
                }
                newCategories[category].push(link);
            });
        });

        publicLinks.length = 0;
        publicLinks.push(...newPublicLinks);
        privateLinks.length = 0;
        privateLinks.push(...newPrivateLinks);
        Object.keys(categories).forEach(key => delete categories[key]);
        Object.assign(categories, newCategories);

        try {
            const response = await fetch('/api/saveOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    userId: 'testUser',
                    links: [...newPublicLinks, ...newPrivateLinks],
                    categories: newCategories
                }),
            });
            const result = await response.json();
            if (!result.success) {
                throw new Error('Failed to save order');
            }
            logAction('保存卡片顺序', { publicCount: newPublicLinks.length, privateCount: newPrivateLinks.length, categoryCount: Object.keys(newCategories).length });
        } catch (error) {
            logAction('保存顺序失败', { error: error.message });
            await customAlert('保存顺序失败，请重试', '保存失败');
        }
    }

    // 设置状态重新加载卡片
    async function reloadCardsAsAdmin() {
        document.querySelectorAll('.card-container').forEach(container => {
            container.innerHTML = '';
        });
        await loadLinks();
        logAction('重新加载卡片（管理员模式）');
    }

    // 处理登录按钮点击
    async function handleLoginClick() {
        if (isLoggedIn) {
            // 如果已登录，退出登录
            const confirmed = await customConfirm('确定要退出登录吗？', '确定', '取消');
            if (confirmed) {
                await logout();
            }
        } else {
            // 如果未登录，显示登录弹窗
            showLoginModal();
        }
    }

    // 显示登录弹窗
    function showLoginModal() {
        document.getElementById('login-modal').style.display = 'flex';
        document.getElementById('login-password').focus();
    }

    // 隐藏登录弹窗
    function hideLoginModal() {
        document.getElementById('login-modal').style.display = 'none';
        document.getElementById('login-password').value = '';
    }

    // 执行登录
    async function performLogin() {
        const password = document.getElementById('login-password').value;
        if (!password) {
            await customAlert('请输入密码', '提示');
            return;
        }

        try {
            const result = await verifyPassword(password);
            if (result.valid) {
                isLoggedIn = true;
                localStorage.setItem('authToken', result.token);
                console.log('Token saved:', result.token);
                loadLinks();
                hideLoginModal();
                updateLoginButton();
                await customAlert('登录成功！', '登录');
                logAction('登录成功');
            } else {
                await customAlert('密码错误', '登录失败');
                logAction('登录失败', { reason: result.error || '密码错误' });
            }
        } catch (error) {
            // 🔧 安全修复：避免泄露详细错误信息
            console.error('Login error occurred');
            await customAlert('登录过程出错，请重试', '错误');
        }
    }

    // 退出登录
    async function logout() {
        isLoggedIn = false;
        isAdmin = false;
        localStorage.removeItem('authToken');
        links = publicLinks;
        renderSections();
        updateLoginButton();
        await customAlert('退出登录成功！', '退出登录');
        updateUIState();
        logAction('退出登录');
    }

    // 更新按钮状态
    function updateLoginButton() {
        const loginBtn = document.getElementById('login-btn');
        const adminBtn = document.getElementById('admin-btn');

        if (isLoggedIn) {
            loginBtn.textContent = '退出登录';
            adminBtn.style.display = 'inline-block';
            if (isAdmin) {
                adminBtn.textContent = '离开设置';
            } else {
                adminBtn.textContent = '设置';
            }
        } else {
            loginBtn.textContent = '登录';
            adminBtn.style.display = 'none';
        }
    }

    // 切换书签搜索下拉框
    function toggleBookmarkSearch() {
        const dropdown = document.getElementById('bookmark-search-dropdown');
        const isVisible = dropdown.classList.contains('show');

        if (isVisible) {
            dropdown.classList.remove('show');
        } else {
            dropdown.classList.add('show');
            document.getElementById('bookmark-search-input').focus();
        }
    }

    // 点击页面其他地方关闭书签搜索下拉框
    document.addEventListener('click', function(event) {
        const searchToggle = document.querySelector('.bookmark-search-toggle');
        const dropdown = document.getElementById('bookmark-search-dropdown');

        if (!searchToggle.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });

    // 登录密码输入框回车事件
    document.getElementById('login-password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performLogin();
        }
    });
    async function restoreAndExit() {
        showLoading('正在撤销修改...');
        try {
            const response = await fetch('/api/restoreData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                },
                body: JSON.stringify({ userId: 'testUser' })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || '恢复失败');
            }

            // 恢复成功后，重置状态并退出设置模式
            isAdmin = false;
            removeMode = false;
            isRemoveCategoryMode = false;
            isEditCategoryMode = false;
            document.body.classList.remove('admin-mode');

            await reloadCardsAsAdmin(); // 重新加载已恢复的数据
            updateLoginButton();
            updateUIState();
            hideLoading();
            await customAlert('修改已撤销', '操作完成');
            logAction('离开设置（已从备份恢复）');

        } catch (error) {
            hideLoading();
            await customAlert('恢复数据失败: ' + error.message, '错误');
        }
    }
    // 切换设置状态
    async function toggleAdminMode() {
        if (!isAdmin && isLoggedIn) {
            // --- 进入设置模式的逻辑 (会先进行一次云端备份) ---
            if (!await validateToken()) return;

            showLoading('正在进入设置模式...');
            try {
                const response = await fetch('/api/backupData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('authToken')
                    },
                    body: JSON.stringify({ sourceUserId: 'testUser' })
                });
                const result = await response.json();
                if (!result.success) throw new Error('备份失败');
                logAction('进入设置前的自动备份成功');
            } catch (error) {
                hideLoading();
                const confirmed = await customConfirm('数据备份到服务器失败，是否仍要继续？', '是', '否');
                if (!confirmed) return;
            }

            isAdmin = true;
            document.body.classList.add('admin-mode');
            await reloadCardsAsAdmin();
            updateLoginButton();
            updateUIState();
            isEditCategoryMode = true;
            toggleEditCategory();
            toggleEditCategory();

            hideLoading();
            // await customAlert('已进入设置模式', '提示');
            logAction('进入设置');

        } else if (isAdmin) {
            // --- 离开设置模式的逻辑 (全新) ---
            const confirmed = await customConfirm('是否要保存您在设置模式中所做的修改？', '保存', '不保存');

            if (confirmed) {
                // 用户选择“保存”，直接退出即可 (修改已在过程中自动保存)
                isAdmin = false;
                removeMode = false;
                isRemoveCategoryMode = false;
                isEditCategoryMode = false;
                document.body.classList.remove('admin-mode');

                await reloadCardsAsAdmin(); // 重新加载以显示干净的最终状态
                updateLoginButton();
                updateUIState();

                await customAlert('设置已保存', '操作完成');
                logAction('离开设置（已保存）');
            } else {
                // 用户选择“不保存”，调用恢复函数
                await restoreAndExit();
            }
        }
    }
    // 应用暗色主题
    function applyDarkTheme() {
        document.body.classList.add('dark-theme');
        isDarkTheme = true;
        logAction('应用暗色主题');
    }

    // 全局变量用于管理对话框事件处理器
    let currentConfirmHandler = null;
    let currentCancelHandler = null;

    // 显示编辑链接对话框
    function showEditDialog(link) {
        document.getElementById('dialog-overlay').style.display = 'flex';

        document.getElementById('name-input').value = link.name;
        document.getElementById('url-input').value = link.url;
        document.getElementById('tips-input').value = link.tips || '';
        document.getElementById('icon-input').value = link.icon || '';
        document.getElementById('category-select').value = link.category;
        document.getElementById('private-checkbox').checked = link.isPrivate;

        const confirmBtn = document.getElementById('dialog-confirm-btn');
        const cancelBtn = document.getElementById('dialog-cancel-btn');

        // 清除所有旧的事件处理器
        confirmBtn.onclick = null;
        cancelBtn.onclick = null;
        if (currentConfirmHandler) {
            confirmBtn.removeEventListener('click', currentConfirmHandler);
        }
        if (currentCancelHandler) {
            cancelBtn.removeEventListener('click', currentCancelHandler);
        }

        // 设置新的事件处理器
        currentConfirmHandler = async function (event) {
            event.preventDefault();
            event.stopPropagation();
            await updateLink(link);
        };

        currentCancelHandler = function(event) {
            event.preventDefault();
            event.stopPropagation();
            hideAddDialog();
        };

        confirmBtn.addEventListener('click', currentConfirmHandler);
        cancelBtn.addEventListener('click', currentCancelHandler);

        logAction('显示编辑链接对话框');
    }

    // 显示添加链接对话框
    function showAddDialog() {
        document.getElementById('dialog-overlay').style.display = 'flex';

        const nameInput = document.getElementById('name-input');
        nameInput.value = '';
        document.getElementById('url-input').value = '';
        document.getElementById('tips-input').value = '';
        document.getElementById('icon-input').value = '';
        document.getElementById('private-checkbox').checked = false;

        const confirmBtn = document.getElementById('dialog-confirm-btn');
        const cancelBtn = document.getElementById('dialog-cancel-btn');

        // 清除所有旧的事件处理器
        confirmBtn.onclick = null;
        cancelBtn.onclick = null;
        if (currentConfirmHandler) {
            confirmBtn.removeEventListener('click', currentConfirmHandler);
        }
        if (currentCancelHandler) {
            cancelBtn.removeEventListener('click', currentCancelHandler);
        }

        // 设置新的事件处理器
        currentConfirmHandler = async function (event) {
            event.preventDefault();
            event.stopPropagation();
            await addLink();
        };

        currentCancelHandler = function(event) {
            event.preventDefault();
            event.stopPropagation();
            hideAddDialog();
        };

        confirmBtn.addEventListener('click', currentConfirmHandler);
        cancelBtn.addEventListener('click', currentCancelHandler);

        setTimeout(() => {
            nameInput.focus();
        }, 50);

        logAction('显示添加链接对话框');
    }

    // 更新链接
    async function updateLink(oldLink) {
        if (!await validateToken()) return;

        const name = document.getElementById('name-input').value.trim();
        const url = document.getElementById('url-input').value.trim();
        const tips = document.getElementById('tips-input').value.trim();
        const icon = document.getElementById('icon-input').value.trim();
        const category = document.getElementById('category-select').value;
        const isPrivate = document.getElementById('private-checkbox').checked;

        // 验证必填字段
        if (!name || !url || !category) {
            let errorMessage = '';
            if (!name && !url) {
                errorMessage = '请输入名称和URL';
            } else if (!name) {
                errorMessage = '请输入名称';
            } else if (!url) {
                errorMessage = '请输入URL';
            }

            await customAlert(errorMessage, '编辑卡片');
            if (!name) {
                document.getElementById('name-input').focus();
            } else if (!url) {
                document.getElementById('url-input').focus();
            }
            return;
        }

        // 检查URL是否与其他链接重复（排除当前编辑的链接）
        const normalizedUrl = url.toLowerCase();
        const allLinks = [...publicLinks, ...privateLinks];
        const isUrlExists = allLinks.some(link =>
            link.url.toLowerCase() === normalizedUrl && link.url !== oldLink.url
        );

        if (isUrlExists) {
            await customAlert('该URL已存在，请勿重复添加', '编辑卡片');
            document.getElementById('url-input').focus();
            return;
        }

        const updatedLink = { name, url, tips, icon, category, isPrivate };

        try {
            // 替换旧链接
            const list = oldLink.isPrivate ? privateLinks : publicLinks;
            const index = list.findIndex(l => l.url === oldLink.url);
            if (index !== -1) {
                list[index] = updatedLink;
            }

            // 同步更新 links
            links = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

            await saveLinks();
            renderSections();
            hideAddDialog();

            logAction('更新卡片', { oldUrl: oldLink.url, name, url, tips, icon, category, isPrivate });
        } catch (error) {
            logAction('更新卡片失败:', error);
            await customAlert('更新卡片失败:' + error.message, '编辑卡片');
        }
    }

    // 隐藏添加链接对话框
    function hideAddDialog() {
        document.getElementById('dialog-overlay').style.display = 'none';

        // 清理事件处理器
        const confirmBtn = document.getElementById('dialog-confirm-btn');
        const cancelBtn = document.getElementById('dialog-cancel-btn');

        if (currentConfirmHandler) {
            confirmBtn.removeEventListener('click', currentConfirmHandler);
            currentConfirmHandler = null;
        }
        if (currentCancelHandler) {
            cancelBtn.removeEventListener('click', currentCancelHandler);
            currentCancelHandler = null;
        }

        confirmBtn.onclick = null;
        cancelBtn.onclick = null;

        logAction('隐藏添加链接对话框');
    }

    // 切换编辑卡片模式
    function toggleRemoveMode() {
        removeMode = !removeMode;
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');

        editButtons.forEach(btn => {
            btn.style.display = removeMode ? 'flex' : 'none';
        });
        deleteButtons.forEach(btn => {
            btn.style.display = removeMode ? 'flex' : 'none';
        });

        // 隐藏自定义提示框
        document.getElementById('custom-tooltip').style.display = 'none';

        // 切换卡片悬停效果
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (removeMode) {
                card.classList.add('no-hover');
            } else {
                card.classList.remove('no-hover');
            }
        });

        logAction('切换编辑卡片模式', { removeMode });
    }



    // 切换主题
    function toggleTheme() {
        isDarkTheme = !isDarkTheme;

        // 添加或移除暗色主题类并保存选择
        if (isDarkTheme) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark'); // 保存为暗色主题
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light'); // 保存为亮色主题
        }

        logAction('切换主题', { isDarkTheme });
    }

    // 返回顶部
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        logAction('返回顶部');
    }

    // 控制返回顶部按钮显示/隐藏
    function handleBackToTopVisibility() {
        const btn = document.getElementById('back-to-top-btn');
        if (!btn) return;

        // 如果页面滚动高度大于 300px，才显示按钮
        if (window.scrollY > 300) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    }

    // 处理鼠标悬停提示
    function handleTooltipMouseMove(e, tips, isAdmin) {
        const tooltip = document.getElementById('custom-tooltip');

        if (!tips || isAdmin) {
            tooltip.style.display = 'none';
            return;
        }

        // 设置提示内容
        if (tooltip.textContent !== tips) {
            tooltip.textContent = tips;
        }

        tooltip.style.display = 'block';

        const offsetX = 15;
        const offsetY = 10;

        const tooltipRect = tooltip.getBoundingClientRect();
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;

        let left = e.pageX + offsetX;
        let top = e.pageY + offsetY;

        if (pageWidth - e.clientX < 200) {
            left = e.pageX - tooltipRect.width - offsetX;
        }
        // 如果距离底部小于100像素，往上显示
        if (pageHeight - e.clientY < 100) {
            top = e.pageY - tooltipRect.height - offsetY;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }

    function handleTooltipMouseLeave() {
        const tooltip = document.getElementById('custom-tooltip');
        tooltip.style.display = 'none';
    }

    // 验证密码
    async function verifyPassword(inputPassword) {
        const response = await fetch('/api/verifyPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: inputPassword }),
        });
        const result = await response.json();
        return result;
    }

    // 全局变量，标记是否正在显示搜索结果
    let isShowingSearchResults = false;

    // 书签搜索功能 - 简化版
    function searchBookmarks(query) {
        if (!query || query.trim() === '') {
            hideSearchResults();
            return;
        }

        query = query.toLowerCase().trim();
        const sectionsContainer = document.getElementById('sections-container');

        // 只搜索书签名称，简化搜索逻辑
        const visibleLinks = links;
        const matchedLinks = visibleLinks.filter(link =>
            link.name.toLowerCase().includes(query)
        );

        // 清空主内容区域
        sectionsContainer.innerHTML = '';

        // 创建搜索结果头部
        const searchHeader = document.createElement('div');
        searchHeader.className = 'search-results-header';

        const searchTitle = document.createElement('div');
        searchTitle.className = 'search-results-title';
        searchTitle.textContent = '搜索结果 (' + matchedLinks.length + '个)';

        const backButton = document.createElement('button');
        backButton.className = 'back-to-main';
        backButton.textContent = '返回主页';
        backButton.onclick = hideSearchResults;

        searchHeader.appendChild(searchTitle);
        searchHeader.appendChild(backButton);
        sectionsContainer.appendChild(searchHeader);

        if (matchedLinks.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-search-results';
            noResults.textContent = '没有找到匹配的书签';
            noResults.style.textAlign = 'center';
            noResults.style.padding = '40px';
            noResults.style.color = '#666';
            sectionsContainer.appendChild(noResults);
        } else {
            // 创建简单的搜索结果容器
            const resultsSection = document.createElement('div');
            resultsSection.className = 'search-results-section';

            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';

            // 为每个匹配的链接创建卡片
            matchedLinks.forEach(link => {
                createCard(link, cardContainer);
            });

            resultsSection.appendChild(cardContainer);
            sectionsContainer.appendChild(resultsSection);
        }

        // 设置搜索状态标记
        isShowingSearchResults = true;

        // 隐藏分类按钮
        const categoryButtonsContainer = document.getElementById('category-buttons-container');
        if (categoryButtonsContainer) {
            categoryButtonsContainer.style.display = 'none';
        }

        logAction('执行书签搜索', { query, resultCount: matchedLinks.length });
    }

    // 隐藏搜索结果 - 简化版
    function hideSearchResults() {
        // 重置标记
        isShowingSearchResults = false;

        // 清空搜索框
        document.getElementById('bookmark-search-input').value = '';

        // 重新渲染正常的分类和书签
        renderSections();

        // 显示分类按钮
        const categoryButtonsContainer = document.getElementById('category-buttons-container');
        if (categoryButtonsContainer) {
            categoryButtonsContainer.style.display = 'flex';
        }

        // 重新渲染分类按钮，确保分类按钮的正确显示
        renderCategoryButtons();
    }

    // 书签搜索输入框回车事件
    document.getElementById('bookmark-search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = document.getElementById('bookmark-search-input').value;
            searchBookmarks(query);
            // 搜索后关闭下拉框
            document.getElementById('bookmark-search-dropdown').classList.remove('show');
        }
    });

    // 书签搜索输入框实时搜索
    document.getElementById('bookmark-search-input').addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.trim() === '') {
            hideSearchResults();
        } else {
            searchBookmarks(query);
        }
    });



    // 初始化加载
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            await validateToken();
            updateLoginButton();
            await loadLinks();
            // 初始加载完成后，检测当前可见分类
            setTimeout(setActiveCategoryButtonByVisibility, 500);
            // 初始化返回顶部按钮状态
            setTimeout(handleBackToTopVisibility, 100);
        } catch (error) {
            // 🔧 安全修复：避免泄露详细错误信息
            console.error('Initialization failed');
        }
    });

    // 添加滚动事件监听器
    window.addEventListener('scroll', handleBackToTopVisibility);


    // 前端检查是否有 token
    async function validateToken() {
        const token = localStorage.getItem('authToken');
        if (!token) {
            isLoggedIn = false;
            updateUIState();
            return false;
        }

        try {
            const response = await fetch('/api/getLinks?userId=testUser', {
                headers: { 'Authorization': token }
            });

            if (response.status === 401) {
                await resetToLoginState('token已过期，请重新登录');
                return false;
            }

            isLoggedIn = true;
            updateUIState();
            return true;
        } catch (error) {
            // 🔧 安全修复：避免泄露详细错误信息
            console.error('Token validation failed');
            return false;
        }
    }

    // 重置状态
    async function resetToLoginState(message) {
        // 🔧 修复：显示用户可见的Token过期提示
        if (message && message.trim() !== '') {
            await customAlert(message, '登录状态');
        }

        cleanupDragState();

        localStorage.removeItem('authToken');
        isLoggedIn = false;
        isAdmin = false;
        removeMode = false;
        isRemoveCategoryMode = false;
        isEditCategoryMode = false;

        updateLoginButton();
        updateUIState();
        links = publicLinks;
        renderSections();

        const addRemoveControls = document.querySelector('.add-remove-controls');
        if (addRemoveControls) {
            addRemoveControls.style.display = 'none';
        }

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.style.display = 'none';
        });

        document.querySelectorAll('.delete-category-btn').forEach(btn => {
            btn.style.display = 'none';
        });

        document.querySelectorAll('.edit-category-btn').forEach(btn => {
            btn.style.display = 'none';
        });

        document.querySelectorAll('.move-category-btn').forEach(btn => {
            btn.style.display = 'none';
        });

        // 重置分类管理按钮状态
        const manageButton = document.querySelector('.category-manage-btn');
        if (manageButton) {
            manageButton.classList.remove('active');
        }

        const dialogOverlay = document.getElementById('dialog-overlay');
        if (dialogOverlay) {
            dialogOverlay.style.display = 'none';
        }

        const loginModal = document.getElementById('login-modal');
        if (loginModal) {
            loginModal.style.display = 'none';
        }

        // 确保按钮状态正确重置
        const adminBtn = document.getElementById('admin-btn');
        if (adminBtn) {
            adminBtn.style.display = 'none';
        }
    }

    // 自定义Alert对话框
    function customAlert(message, title = '提示', confirmText = '确定') {
        return new Promise((resolve) => {
            const overlay = document.getElementById('custom-alert-overlay');
            const titleEl = document.getElementById('custom-alert-title');
            const contentEl = document.getElementById('custom-alert-content');
            const confirmBtn = document.getElementById('custom-alert-confirm');

            // 设置内容
            titleEl.textContent = title;
            contentEl.textContent = message;
            confirmBtn.textContent = confirmText;

            // 显示弹窗
            overlay.style.display = 'flex';

            // 确认按钮事件
            const handleConfirm = () => {
                overlay.style.display = 'none';
                confirmBtn.removeEventListener('click', handleConfirm);
                document.removeEventListener('keydown', handleKeyDown);
                resolve();
            };

            confirmBtn.addEventListener('click', handleConfirm);

            // ESC键关闭
            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    handleConfirm();
                }
            };

            document.addEventListener('keydown', handleKeyDown);

            // 点击遮罩层关闭
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    handleConfirm();
                }
            });
        });
    }

    // 自定义Confirm对话框
    function customConfirm(message, okText = '确定', cancelText = '取消') {
        return new Promise((resolve) => {
            const overlay = document.getElementById('custom-confirm-overlay');
            const messageEl = document.getElementById('custom-confirm-message');
            const okBtn = document.getElementById('custom-confirm-ok');
            const cancelBtn = document.getElementById('custom-confirm-cancel');

            // 设置弹窗内容
            messageEl.textContent = message;
            okBtn.textContent = okText;
            cancelBtn.textContent = cancelText;

            // 显示弹窗
            overlay.style.display = 'flex';

            // 事件处理函数
            const handleConfirm = (result) => {
                cleanup();
                resolve(result);
            };

            const handleKeyDown = (e) => {
                if (e.key === 'Enter') handleConfirm(true);
                if (e.key === 'Escape') handleConfirm(false);
            };

            // 清理函数
            const cleanup = () => {
                overlay.style.display = 'none';
                document.removeEventListener('keydown', handleKeyDown);
                okBtn.onclick = null;
                cancelBtn.onclick = null;
                overlay.onclick = null;
            };

            // 绑定事件
            okBtn.onclick = () => handleConfirm(true);
            cancelBtn.onclick = () => handleConfirm(false);
            document.addEventListener('keydown', handleKeyDown);
            overlay.onclick = (e) => e.target === overlay && handleConfirm(false);
        });
    }

    // 分类名称输入对话框
    function showCategoryDialog(title, defaultValue = '') {
        return new Promise((resolve) => {
            const dialog = document.getElementById('category-dialog');
            const input = document.getElementById('category-name-input');
            const titleEl = document.getElementById('category-dialog-title');
            const confirmBtn = document.getElementById('category-confirm-btn');
            const cancelBtn = document.getElementById('category-cancel-btn');

            // 设置弹窗内容
            titleEl.textContent = title;
            input.value = defaultValue;

            // 显示弹窗
            dialog.style.display = 'flex';
            setTimeout(() => input.focus(), 50);

            // 事件处理函数
            const handleConfirm = () => {
                const value = input.value.trim();
                if (value) {
                    cleanup();
                    resolve(value);
                } else {
                    input.focus();
                }
            };

            const handleCancel = () => {
                cleanup();
                resolve(null);
            };

            const handleKeyDown = (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleConfirm();
                } else if (e.key === 'Escape') {
                    handleCancel();
                }
            };

            // 清理函数
            const cleanup = () => {
                dialog.style.display = 'none';
                document.removeEventListener('keydown', handleKeyDown);
                confirmBtn.onclick = null;
                cancelBtn.onclick = null;
                dialog.onclick = null;
            };

            // 绑定事件
            confirmBtn.onclick = handleConfirm;
            cancelBtn.onclick = handleCancel;
            document.addEventListener('keydown', handleKeyDown);
        });
    }

    // 显示加载遮罩
    function showLoading(message = '加载中，请稍候...') {
        const mask = document.getElementById('loading-mask');
        const textElement = mask.querySelector('p');
        textElement.textContent = message;
        mask.style.display = 'flex';
    }

    // 隐藏加载遮罩
    function hideLoading() {
        const mask = document.getElementById('loading-mask');
        mask.style.display = 'none';
    }

// ==== 导出书签 ====
function exportBookmarks() {
    const dataStr = JSON.stringify(links, null, 2); // pretty print
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    a.download = 'bookmarks-' + new Date().toISOString().slice(0,10) + '.json';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    logAction("导出书签", { count: links.length });
}

// ==== 导入书签 ====
function importBookmarks(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedLinks = JSON.parse(e.target.result);
            if (!Array.isArray(importedLinks)) throw new Error("格式错误");

            importedLinks.forEach(link => {
                // 如果分类不存在，先创建
                if (!categories[link.category]) {
                    categories[link.category] = [];
                }
                // 添加或覆盖
                const idx = links.findIndex(l => l.url === link.url);
                if (idx >= 0) {
                    links[idx] = link; // 覆盖
                } else {
                    links.push(link);
                }
            });

            updateCategorySelect();
            renderSections();
            renderCategoryButtons();
            saveLinks();
            logAction("导入书签", { count: importedLinks.length });
            alert("导入完成，共 " + importedLinks.length + " 条书签");
        } catch (err) {
            alert("导入失败：" + err.message);
        }
    };
    reader.readAsText(file);
}

function handleImportClick() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = e => {
        const file = e.target.files[0];
        if (file) {
            importBookmarks(file);
        }
    };
    input.click();
}

// --- VVVVVV 新增备份管理功能函数 VVVVVV ---
async function showBackupManager() {
    if (!await validateToken()) return;
    document.getElementById('backup-modal-overlay').style.display = 'flex';
    const listContainer = document.getElementById('backup-list-container');
    listContainer.innerHTML = '<div style="text-align:center; padding: 20px; color: #888;">加载中...</div>';

    try {
        const response = await fetch('/api/listBackups', {
            headers: { 'Authorization': localStorage.getItem('authToken') }
        });
        if (!response.ok) throw new Error('获取备份列表失败');
        const backupKeys = await response.json();
        renderBackupList(backupKeys);
    } catch (error) {
        listContainer.innerHTML = '<div style="text-align:center; padding: 20px; color: #e74c3c;">' + error.message + '</div>';
    }
}

function hideBackupManager() {
    document.getElementById('backup-modal-overlay').style.display = 'none';
}

function renderBackupList(keys) {
    const listContainer = document.getElementById('backup-list-container');
    const lastBackupTimeEl = document.getElementById('last-backup-time');
    listContainer.innerHTML = '';

    if (keys.length === 0) {
        listContainer.innerHTML = '<div style="text-align:center; padding: 20px; color: #888;">暂无备份记录</div>';
        lastBackupTimeEl.textContent = '上次备份时间: 暂无';
        return;
    }

    // 按时间降序排序
    keys.sort((a, b) => b.localeCompare(a));
    
    lastBackupTimeEl.textContent = '上次备份时间: ' + formatBackupKey(keys[0]);

    keys.forEach(key => {
        const item = document.createElement('div');
        item.className = 'backup-list-item';

        const timestamp = document.createElement('span');
        timestamp.className = 'timestamp';
        timestamp.textContent = formatBackupKey(key);

        const actions = document.createElement('div');
        actions.className = 'actions';

        const restoreLink = document.createElement('a');
        restoreLink.textContent = '从此节点恢复';
        restoreLink.onclick = () => handleRestoreFromBackup(key);

        const deleteLink = document.createElement('a');
        deleteLink.className = 'delete-backup-btn';
        deleteLink.innerHTML = '&#128465;'; // Trash can emoji
        deleteLink.title = '删除此备份';
        deleteLink.onclick = () => handleDeleteBackup(key);
        
        actions.appendChild(restoreLink);
        actions.appendChild(deleteLink);
        item.appendChild(timestamp);
        item.appendChild(actions);
        listContainer.appendChild(item);
    });
}

function formatBackupKey(key) {
    return key.replace('backup_', '').replace('_', ' ');
}

async function handleManualBackup() {
    const confirmed = await customConfirm('确定要立即创建一个新的备份吗？', '确定', '取消');
    if (!confirmed) return;

    showLoading('正在创建备份...');
    try {
        const response = await fetch('/api/backupData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken')
            },
            body: JSON.stringify({ sourceUserId: 'testUser' })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || '备份失败');
        
        hideLoading();
        await customAlert('备份创建成功！', '成功');
        await showBackupManager(); // 刷新列表
    } catch (error) {
        hideLoading();
        await customAlert('备份失败: ' + error.message, '错误');
    }
}

async function handleRestoreFromBackup(backupId) {
    const message = '确定要从备份点 "' + formatBackupKey(backupId) + '" 恢复吗？\\n\\n注意：当前所有数据都将被此备份覆盖，此操作不可逆！';
    const confirmed = await customConfirm(message, '确定恢复', '取消');
    if (!confirmed) return;

    showLoading('正在恢复数据...');
    try {
        const response = await fetch('/api/restoreFromBackup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken')
            },
            body: JSON.stringify({ userId: 'testUser', backupId: backupId })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || '恢复失败');

        hideLoading();
        hideBackupManager();
        await customAlert('数据恢复成功！页面将重新加载。', '成功');
        await loadLinks(); // 重新加载主页数据
    } catch (error) {
        hideLoading();
        await customAlert('恢复失败: ' + error.message, '错误');
    }
}

async function handleDeleteBackup(backupId) {
    const confirmed = await customConfirm('确定要永久删除备份 "' + formatBackupKey(backupId) + '" 吗？', '确定删除', '取消');
    if (!confirmed) return;

    showLoading('正在删除...');
    try {
         const response = await fetch('/api/deleteBackup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken')
            },
            body: JSON.stringify({ backupId: backupId })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || '删除失败');
        
        hideLoading();
        await customAlert('备份已删除', '成功');
        await showBackupManager(); // 刷新列表
    } catch (error) {
        hideLoading();
        await customAlert('删除失败: ' + error.message, '错误');
    }
}
// --- ^^^^^^ 新增备份管理功能函数 ^^^^^^ ---

    </script>
</body>

</html>
`;

// 常量时间比较函数，防止时序攻击
function constantTimeCompare(a, b) {
    if (a.length !== b.length) return false;
    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
}

// 服务端 token 验证
async function validateServerToken(authToken, env) {
    if (!authToken) {
        return {
            isValid: false,
            status: 401,
            response: { error: 'Unauthorized', message: '未登录或登录已过期' }
        };
    }

    try {
        const [timestamp, hash] = authToken.split('.');
        const tokenTimestamp = parseInt(timestamp);
        const now = Date.now();

        const FIFTEEN_MINUTES = 30 * 24 * 60 * 60 * 1000;
        if (now - tokenTimestamp > FIFTEEN_MINUTES) {
            return {
                isValid: false,
                status: 401,
                response: {
                    error: 'Token expired',
                    tokenExpired: true,
                    message: '登录已过期，请重新登录'
                }
            };
        }

        const tokenData = timestamp + "_" + env.ADMIN_PASSWORD;
        const encoder = new TextEncoder();
        const data = encoder.encode(tokenData);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const expectedHash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));

        // 使用常量时间比较防止时序攻击
        if (!constantTimeCompare(hash, expectedHash)) {
            return {
                isValid: false,
                status: 401,
                response: {
                    error: 'Invalid token',
                    tokenInvalid: true,
                    message: '登录状态无效，请重新登录'
                }
            };
        }

        return { isValid: true };
    } catch (error) {
        // 避免泄露详细错误信息
        return {
            isValid: false,
            status: 401,
            response: {
                error: 'Invalid token',
                tokenInvalid: true,
                message: '登录验证失败，请重新登录'
            }
        };
    }
}

// 管理员权限验证函数
async function validateAdminToken(authToken, env) {
    const validation = await validateServerToken(authToken, env);
    if (!validation.isValid) {
        return validation;
    }

    // Token有效，确认管理员权限
    return {
        isValid: true,
        isAdmin: true
    };
}

export default {
    async fetch(request, env) {
      const url = new URL(request.url);

      if (url.pathname === '/') {
        return new Response(HTML_CONTENT, {
          headers: { 'Content-Type': 'text/html' }
        });
      }

      if (url.pathname === '/api/getLinks') {
        const userId = url.searchParams.get('userId');
        const authToken = request.headers.get('Authorization');
        const data = await env.CARD_ORDER.get(userId);

        if (data) {
            const parsedData = JSON.parse(data);

            // 验证 token
            if (authToken) {
                const validation = await validateServerToken(authToken, env);
                if (!validation.isValid) {
                    return new Response(JSON.stringify(validation.response), {
                        status: validation.status,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }

                // Token 有效，返回完整数据
                return new Response(JSON.stringify(parsedData), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            // 未提供 token，只返回公开数据
            const filteredLinks = parsedData.links.filter(link => !link.isPrivate);
            const filteredCategories = {};
            Object.keys(parsedData.categories).forEach(category => {
                if(parsedData.categories[category]) {
                    filteredCategories[category] = parsedData.categories[category].filter(link => !link.isPrivate);
                }
            });

            return new Response(JSON.stringify({
                links: filteredLinks,
                categories: filteredCategories
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({
            links: [],
            categories: {}
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
      }

      if (url.pathname === '/api/saveOrder' && request.method === 'POST') {
        const authToken = request.headers.get('Authorization');
        const validation = await validateServerToken(authToken, env);

        if (!validation.isValid) {
            return new Response(JSON.stringify(validation.response), {
                status: validation.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { userId, links, categories } = await request.json();
        await env.CARD_ORDER.put(userId, JSON.stringify({ links, categories }));
        return new Response(JSON.stringify({
            success: true,
            message: '保存成功'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
      }

      if (url.pathname === '/api/verifyPassword' && request.method === 'POST') {
        try {
            const { password } = await request.json();
            const isValid = password === env.ADMIN_PASSWORD;

            if (isValid) {
                // 生成包含时间戳的加密 token
                const timestamp = Date.now();
                const tokenData = timestamp + "_" + env.ADMIN_PASSWORD;
                const encoder = new TextEncoder();
                const data = encoder.encode(tokenData);
                const hashBuffer = await crypto.subtle.digest('SHA-256', data);

                // 使用指定格式：timestamp.hash
                const token = timestamp + "." + btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));

                return new Response(JSON.stringify({
                    valid: true,
                    token: token
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            return new Response(JSON.stringify({
                valid: false,
                error: 'Invalid password'
            }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify({
                valid: false,
                error: error.message
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
      }

      if (url.pathname === '/api/backupData' && request.method === 'POST') {
        const authToken = request.headers.get('Authorization');
        const validation = await validateAdminToken(authToken, env);

        if (!validation.isValid) {
            return new Response(JSON.stringify(validation.response), {
                status: validation.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        try {
            const { sourceUserId } = await request.json();
            const result = await this.backupData(env, sourceUserId);
            return new Response(JSON.stringify(result), {
              status: result.success ? 200 : 404,
              headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify({
                success: false,
                message: '备份操作失败'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
      }
      if (url.pathname === '/api/restoreData' && request.method === 'POST') {
        const authToken = request.headers.get('Authorization');
        const validation = await validateAdminToken(authToken, env);

        if (!validation.isValid) {
            return new Response(JSON.stringify(validation.response), {
                status: validation.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        try {
            const { userId } = await request.json();
            const result = await this.restoreData(env, userId);
            return new Response(JSON.stringify(result), {
                status: result.success ? 200 : 500,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            return new Response(JSON.stringify({ success: false, message: '恢复操作失败' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
      }
      
      // --- VVVVVV 新增后端 API 接口 VVVVVV ---
      
      // 1. 获取备份列表
      if (url.pathname === '/api/listBackups' && request.method === 'GET') {
          const authToken = request.headers.get('Authorization');
          const validation = await validateAdminToken(authToken, env);
          if (!validation.isValid) {
              return new Response(JSON.stringify(validation.response), { status: validation.status, headers: { 'Content-Type': 'application/json' } });
          }
          const backups = await env.CARD_ORDER.list({ prefix: 'backup_' });
          const backupKeys = backups.keys.map(key => key.name);
          return new Response(JSON.stringify(backupKeys), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      // 2. 从指定备份恢复
      if (url.pathname === '/api/restoreFromBackup' && request.method === 'POST') {
          const authToken = request.headers.get('Authorization');
          const validation = await validateAdminToken(authToken, env);
          if (!validation.isValid) {
              return new Response(JSON.stringify(validation.response), { status: validation.status, headers: { 'Content-Type': 'application/json' } });
          }
          const { userId, backupId } = await request.json();
          if (!userId || !backupId) {
              return new Response(JSON.stringify({ success: false, message: '缺少参数' }), { status: 400 });
          }
          const backupData = await env.CARD_ORDER.get(backupId);
          if (backupData) {
              await env.CARD_ORDER.put(userId, backupData);
              return new Response(JSON.stringify({ success: true, message: '已从 ' + backupId + ' 恢复' }), { status: 200 });
          }
          return new Response(JSON.stringify({ success: false, message: '备份文件不存在' }), { status: 404 });
      }
      
      // 3. 删除指定备份
      if (url.pathname === '/api/deleteBackup' && request.method === 'POST') {
          const authToken = request.headers.get('Authorization');
          const validation = await validateAdminToken(authToken, env);
          if (!validation.isValid) {
              return new Response(JSON.stringify(validation.response), { status: validation.status, headers: { 'Content-Type': 'application/json' } });
          }
          const { backupId } = await request.json();
          if (!backupId) {
              return new Response(JSON.stringify({ success: false, message: '缺少参数' }), { status: 400 });
          }
          await env.CARD_ORDER.delete(backupId);
          return new Response(JSON.stringify({ success: true, message: backupId + ' 已删除' }), { status: 200 });
      }

      // --- ^^^^^^ 新增后端 API 接口 ^^^^^^ ---

      return new Response('Not Found', { status: 404 });
    },

    async backupData(env, sourceUserId) {
        const MAX_BACKUPS = 10;
        const sourceData = await env.CARD_ORDER.get(sourceUserId);

        if (sourceData) {
            try {
                const currentDate = new Date().toLocaleString('zh-CN', {
                    timeZone: 'Asia/Shanghai',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).replace(/\//g, '-').replace(/:/g, '.');

                const backupId = `backup_${currentDate}`;

                const backups = await env.CARD_ORDER.list({ prefix: 'backup_' });
                const backupKeys = backups.keys.map(key => key.name);

                await env.CARD_ORDER.put(backupId, sourceData);

                const allBackups = [...backupKeys, backupId].sort().reverse();
                
                if (allBackups.length > MAX_BACKUPS) {
                    const backupsToDelete = allBackups.slice(MAX_BACKUPS);
                    await Promise.all(
                        backupsToDelete.map(key => env.CARD_ORDER.delete(key))
                    );
                }

                return {
                    success: true,
                    backupId
                };
            } catch (error) {
                return {
                    success: false,
                    message: '备份操作失败',
                    details: error.message
                };
            }
        }
        return { success: false, message: '源数据未找到' };
    },
    async restoreData(env, targetUserId) {
        const backups = await env.CARD_ORDER.list({ prefix: 'backup_' });
        if (backups.keys.length === 0) {
            return { success: false, message: '未找到任何备份' };
        }
        backups.keys.sort((a, b) => b.name.localeCompare(a.name));
        const latestBackupKey = backups.keys[0].name;

        const backupData = await env.CARD_ORDER.get(latestBackupKey);
        if (backupData) {
            await env.CARD_ORDER.put(targetUserId, backupData);
            return { success: true, message: `已从备份 ${latestBackupKey} 恢复` };
        }
        return { success: false, message: `读取备份 ${latestBackupKey} 失败` };
    },
  };
