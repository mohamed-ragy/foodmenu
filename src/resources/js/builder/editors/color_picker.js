/*!
* Copyright (c) 2021 Momo Bassit.
* Licensed under the MIT License (MIT)
* https://github.com/mdbassit/Coloris
*/
(function (window, document, Math, undefined) {
    var ctx = document.createElement('canvas').getContext('2d');
    var currentColor = { r: 0, g: 0, b: 0, h: 0, s: 0, v: 0, a: 1 };
    var container,picker,colorArea,colorMarker,colorPreview,color_picker_hex_input,color_picker_rgb_input_r,color_picker_rgb_input_g,color_picker_rgb_input_b,clearButton,closeButton,
    hueSlider,hueMarker,alphaSlider,alphaMarker,currentEl,currentFormat,oldColor,keyboardNav,
    colorAreaDims = {};

    // Default settings
    var settings = {
        el: '[data-coloris]',
        parent: 'body',
        theme: 'default',
        themeMode: 'light',
        rtl: false,
        wrap: true,
        margin: 2,
        format: 'hex',
        formatToggle: false,
        swatches: [],
        swatchesOnly: false,
        alpha: false,
        forceAlpha: false,
        focusInput: false,
        selectInput: false,
        inline: false,
        defaultColor: '#000000',
        clearButton: false,
        clearLabel: 'Clear',
        closeButton: false,
        closeLabel: 'Close',
        onChange: function onChange() {return undefined;},
        a11y: {
        open: 'Open color picker',
        close: 'Close color picker',
        clear: 'Clear the selected color',
        marker: 'Saturation: {s}. Brightness: {v}.',
        hueSlider: 'Hue slider',
        alphaSlider: 'Opacity slider',
        input: 'Color value field',
        format: 'Color format',
        swatch: 'Color swatch',
        instruction: 'Saturation and brightness selector. Use up, down, left and right arrow keys to select.' } };



    // Virtual instances cache
    var instances = {};
    var currentInstanceId = '';
    var defaultInstance = {};
    var hasInstance = false;

    /**
     * Configure the color picker.
     * @param {object} options Configuration options.
     */
    function configure(options) {
        if (typeof options !== 'object') {
        return;
        }

        for (var key in options) {
        switch (key) {
            case 'el':
            bindFields(options.el);
            if (options.wrap !== false) {
                wrapFields(options.el);
            }
            break;
            case 'parent':
            container = document.querySelector(options.parent);
            if (container) {
                container.appendChild(picker);
                settings.parent = options.parent;

                // document.body is special
                if (container === document.body) {
                container = undefined;
                }
            }
            break;
            case 'themeMode':
            settings.themeMode = options.themeMode;
            if (options.themeMode === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                settings.themeMode = 'dark';
            }
            // The lack of a break statement is intentional
            case 'theme':
            if (options.theme) {
                settings.theme = options.theme;
            }

            // Set the theme and color scheme
            picker.className = "clr-picker clr-" + settings.theme + " clr-" + settings.themeMode;

            // Update the color picker's position if inline mode is in use
            if (settings.inline) {
                updatePickerPosition();
            }
            break;
            case 'rtl':
            settings.rtl = !!options.rtl;
            document.querySelectorAll('.clr-field').forEach(function (field) {return field.classList.toggle('clr-rtl', settings.rtl);});
            break;
            case 'margin':
            options.margin *= 1;
            settings.margin = !isNaN(options.margin) ? options.margin : settings.margin;
            break;
            case 'wrap':
            if (options.el && options.wrap) {
                wrapFields(options.el);
            }
            break;
            case 'formatToggle':
            settings.formatToggle = !!options.formatToggle;
            getEl('clr-format').style.display = settings.formatToggle ? 'block' : 'none';
            if (settings.formatToggle) {
                settings.format = 'auto';
            }
            break;
            case 'swatches':
            if (Array.isArray(options.swatches)) {(function () {
                var swatches = [];

                options.swatches.forEach(function (swatch, i) {
                    swatches.push("<button type=\"button\" id=\"clr-swatch-" + i + "\" aria-labelledby=\"clr-swatch-label clr-swatch-" + i + "\" style=\"color: " + swatch + ";\">" + swatch + "</button>");
                });

                getEl('clr-swatches').innerHTML = swatches.length ? "<div>" + swatches.join('') + "</div>" : '';
                settings.swatches = options.swatches.slice();})();
            }
            break;
            case 'swatchesOnly':
            settings.swatchesOnly = !!options.swatchesOnly;
            picker.setAttribute('data-minimal', settings.swatchesOnly);
            break;
            case 'alpha':
            settings.alpha = !!options.alpha;
            picker.setAttribute('data-alpha', settings.alpha);
            break;
            case 'inline':
            settings.inline = !!options.inline;
            picker.setAttribute('data-inline', settings.inline);

            if (settings.inline) {
                var defaultColor = options.defaultColor || settings.defaultColor;

                currentFormat = getColorFormatFromStr(defaultColor);
                updatePickerPosition();
                setColorFromStr(defaultColor);
            }
            break;
            case 'clearButton':
            // Backward compatibility
            if (typeof options.clearButton === 'object') {
                if (options.clearButton.label) {
                settings.clearLabel = options.clearButton.label;
                clearButton.innerHTML = settings.clearLabel;
                }

                options.clearButton = options.clearButton.show;
            }

            settings.clearButton = !!options.clearButton;
            clearButton.style.display = settings.clearButton ? 'block' : 'none';
            break;
            case 'clearLabel':
            settings.clearLabel = options.clearLabel;
            clearButton.innerHTML = settings.clearLabel;
            break;
            case 'closeButton':
            settings.closeButton = !!options.closeButton;

            if (settings.closeButton) {
                picker.insertBefore(closeButton, colorPreview);
            } else {
                colorPreview.appendChild(closeButton);
            }

            break;
            case 'closeLabel':
            settings.closeLabel = options.closeLabel;
            closeButton.innerHTML = settings.closeLabel;
            break;
            case 'a11y':
            var labels = options.a11y;
            var update = false;

            if (typeof labels === 'object') {
                for (var label in labels) {
                if (labels[label] && settings.a11y[label]) {
                    settings.a11y[label] = labels[label];
                    update = true;
                }
                }
            }

            if (update) {
                var openLabel = getEl('clr-open-label');
                var swatchLabel = getEl('clr-swatch-label');

                openLabel.innerHTML = settings.a11y.open;
                swatchLabel.innerHTML = settings.a11y.swatch;
                closeButton.setAttribute('aria-label', settings.a11y.close);
                clearButton.setAttribute('aria-label', settings.a11y.clear);
                hueSlider.setAttribute('aria-label', settings.a11y.hueSlider);
                alphaSlider.setAttribute('aria-label', settings.a11y.alphaSlider);
                colorArea.setAttribute('aria-label', settings.a11y.instruction);
            }
            break;
            default:
            settings[key] = options[key];}

        }
    }

    /**
     * Add or update a virtual instance.
     * @param {String} selector The CSS selector of the elements to which the instance is attached.
     * @param {Object} options Per-instance options to apply.
     */
    function setVirtualInstance(selector, options) {
        if (typeof selector === 'string' && typeof options === 'object') {
        instances[selector] = options;
        hasInstance = true;
        }
    }

    /**
     * Remove a virtual instance.
     * @param {String} selector The CSS selector of the elements to which the instance is attached.
     */
    function removeVirtualInstance(selector) {
        delete instances[selector];

        if (Object.keys(instances).length === 0) {
        hasInstance = false;

        if (selector === currentInstanceId) {
            resetVirtualInstance();
        }
        }
    }

    /**
     * Attach a virtual instance to an element if it matches a selector.
     * @param {Object} element Target element that will receive a virtual instance if applicable.
     */
    function attachVirtualInstance(element) {
        if (hasInstance) {
        // These options can only be set globally, not per instance
        var unsupportedOptions = ['el', 'wrap', 'rtl', 'inline', 'defaultColor', 'a11y'];var _loop = function _loop(

        selector) {
            var options = instances[selector];

            // If the element matches an instance's CSS selector
            if (element.matches(selector)) {
            currentInstanceId = selector;
            defaultInstance = {};

            // Delete unsupported options
            unsupportedOptions.forEach(function (option) {return delete options[option];});

            // Back up the default options so we can restore them later
            for (var option in options) {
                defaultInstance[option] = Array.isArray(settings[option]) ? settings[option].slice() : settings[option];
            }

            // Set the instance's options
            configure(options);
            return "break";
            }};for (var selector in instances) {var _ret = _loop(selector);if (_ret === "break") break;
        }
        }
    }

    /**
     * Revert any per-instance options that were previously applied.
     */
    function resetVirtualInstance() {
        if (Object.keys(defaultInstance).length > 0) {
        configure(defaultInstance);
        currentInstanceId = '';
        defaultInstance = {};
        }
    }

    /**
     * Bind the color picker to input fields that match the selector.
     * @param {string} selector One or more selectors pointing to input fields.
     */
    function bindFields(selector) {
        // Show the color picker on click on the input fields that match the selector
        addListener(document, 'click', '.color_picker', function (event) {
        // Skip if inline mode is in use
        if (settings.inline) {
            return;
        }

        // Apply any per-instance options first
        attachVirtualInstance(event.target);

        currentEl = event.target;
        oldColor = currentEl.value;
        currentFormat = getColorFormatFromStr(oldColor);
        picker.classList.add('clr-open');

        updatePickerPosition();
        setColorFromStr(oldColor);

        // if (settings.focusInput || settings.selectInput) {
        //     colorValue.focus({ preventScroll: true });
        //     colorValue.setSelectionRange(currentEl.selectionStart, currentEl.selectionEnd);
        // }

        // if (settings.selectInput) {
        //     colorValue.select();
        // }

        // Always focus the first element when using keyboard navigation
        if (keyboardNav || settings.swatchesOnly) {
            getFocusableElements().shift().focus();
        }

        // Trigger an "open" event
        currentEl.dispatchEvent(new Event('open', { bubbles: true }));
        });

        // Update the color preview of the input fields that match the selector
        addListener(document, 'input', selector, function (event) {
        var parent = event.target.parentNode;

        // Only update the preview if the field has been previously wrapped
        if (parent.classList.contains('clr-field')) {
            parent.style.color = event.target.value;
        }
        });
    }

    /**
     * Update the color picker's position and the color gradient's offset
     */
    function updatePickerPosition() {
        var parent = container;
        var scrollY = window.scrollY;
        var pickerWidth = picker.offsetWidth;
        var pickerHeight = picker.offsetHeight;
        var reposition = { left: false, top: false };
        var parentStyle, parentMarginTop, parentBorderTop;
        var offset = { x: 0, y: 0 };

        if (parent) {
        parentStyle = window.getComputedStyle(parent);
        parentMarginTop = parseFloat(parentStyle.marginTop);
        parentBorderTop = parseFloat(parentStyle.borderTopWidth);

        offset = parent.getBoundingClientRect();
        offset.y += parentBorderTop + scrollY;
        }

        if (!settings.inline) {
        var coords = currentEl.getBoundingClientRect();
        var left = coords.x;
        var top = scrollY + coords.y + coords.height + settings.margin;

        // If the color picker is inside a custom container
        // set the position relative to it
        if (parent) {
            left -= offset.x;
            top -= offset.y;

            if (left + pickerWidth > parent.clientWidth) {
            left += coords.width - pickerWidth;
            reposition.left = true;
            }

            if (top + pickerHeight > parent.clientHeight - parentMarginTop) {
            if (pickerHeight + settings.margin <= coords.top - (offset.y - scrollY)) {
                top -= coords.height + pickerHeight + settings.margin * 2;
                reposition.top = true;
            }
            }

            top += parent.scrollTop;

            // Otherwise set the position relative to the whole document
        } else {
            if (left + pickerWidth > document.documentElement.clientWidth) {
            left += coords.width - pickerWidth;
            reposition.left = true;
            }

            if (top + pickerHeight - scrollY > document.documentElement.clientHeight) {
            if (pickerHeight + settings.margin <= coords.top) {
                top = scrollY + coords.y - pickerHeight - settings.margin;
                reposition.top = true;
            }
            }
        }

        picker.classList.toggle('clr-left', reposition.left);
        picker.classList.toggle('clr-top', reposition.top);
        picker.style.left = left + "px";
        picker.style.top = top + "px";
        offset.x += picker.offsetLeft;
        offset.y += picker.offsetTop;
        }

        colorAreaDims = {
        width: colorArea.offsetWidth,
        height: colorArea.offsetHeight,
        x: colorArea.offsetLeft + offset.x,
        y: colorArea.offsetTop + offset.y };

    }

    /**
     * Wrap the linked input fields in a div that adds a color preview.
     * @param {string} selector One or more selectors pointing to input fields.
     */
    function wrapFields(selector) {
        document.querySelectorAll(selector).forEach(function (field) {
        var parentNode = field.parentNode;

        if (!parentNode.classList.contains('clr-field')) {
            var wrapper = document.createElement('div');
            var classes = 'clr-field';

            if (settings.rtl || field.classList.contains('clr-rtl')) {
            classes += ' clr-rtl';
            }

            wrapper.innerHTML = "<button type=\"button\" aria-labelledby=\"clr-open-label\"></button>";
            parentNode.insertBefore(wrapper, field);
            wrapper.setAttribute('class', classes);
            wrapper.style.color = field.value;
            wrapper.appendChild(field);
        }
        });
    }
    /**
     * Close the color picker.
     * @param {boolean} [revert] If true, revert the color to the original value.
     */
    function closePicker(revert) {
        if (currentEl && !settings.inline) {
        var prevEl = currentEl;

        // Revert the color to the original value if needed
        if (revert) {
            // This will prevent the "change" event on the colorValue input to execute its handler
            currentEl = undefined;

            if (oldColor !== prevEl.value) {
            prevEl.value = oldColor;

            // Trigger an "input" event to force update the thumbnail next to the input field
            prevEl.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }

        // Trigger a "change" event if needed
        setTimeout(function () {// Add this to the end of the event loop
            if (oldColor !== prevEl.value) {
            prevEl.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });

        // Hide the picker dialog
        picker.classList.remove('clr-open');

        // Reset any previously set per-instance options
        if (hasInstance) {
            resetVirtualInstance();
        }

        // Trigger a "close" event
        prevEl.dispatchEvent(new Event('close', { bubbles: true }));

        if (settings.focusInput) {
            prevEl.focus({ preventScroll: true });
        }

        // This essentially marks the picker as closed
        currentEl = undefined;
        }
    }

    /**
     * Set the active color from a string.
     * @param {string} str String representing a color.
     */
    function setColorFromStr(str) {
        var rgba = strToRGBA(str);
        var hsva = RGBAtoHSVA(rgba);

        updateMarkerA11yLabel(hsva.s, hsva.v);
        updateColor(rgba, hsva);

        // Update the UI
        hueSlider.value = hsva.h;
        picker.style.color = "hsl(" + hsva.h + ", 100%, 50%)";
        hueMarker.style.left = hsva.h / 360 * 100 + "%";

        colorMarker.style.left = colorAreaDims.width * hsva.s / 100 + "px";
        colorMarker.style.top = colorAreaDims.height - colorAreaDims.height * hsva.v / 100 + "px";

        alphaSlider.value = hsva.a * 100;
        alphaMarker.style.left = hsva.a * 100 + "%";
    }

    /**
     * Guess the color format from a string.
     * @param {string} str String representing a color.
     * @return {string} The color format.
     */
    function getColorFormatFromStr(str) {
        var format = str.substring(0, 3).toLowerCase();

        if (format === 'rgb' || format === 'hsl') {
        return format;
        }

        return 'hex';
    }

    /**
     * Copy the active color to the linked input field.
     * @param {number} [color] Color value to override the active color.
     */
    function pickColor(color) {
        color = color !== undefined ? color : `rgb(${color_picker_rgb_input_r.value},${color_picker_rgb_input_g.value},${color_picker_rgb_input_b.value})`;
        let hex = RGBAToHex({
            r:parseInt(color_picker_rgb_input_r.value),
            g:parseInt(color_picker_rgb_input_g.value),
            b:parseInt(color_picker_rgb_input_b.value),
        });
        color_picker_hex_input.value = hex
        if (currentEl) {
        currentEl.value = color;
        currentEl.dispatchEvent(new Event('input', { bubbles: true }));
        }

        if (settings.onChange) {
        settings.onChange.call(window, color, currentEl);
        }

        document.dispatchEvent(new CustomEvent('coloris:pick', { detail: { color: color, currentEl: currentEl } }));
    }

    /**
     * Set the active color based on a specific point in the color gradient.
     * @param {number} x Left position.
     * @param {number} y Top position.
     */
    function setColorAtPosition(x, y) {
        var hsva = {
        h: hueSlider.value * 1,
        s: x / colorAreaDims.width * 100,
        v: 100 - y / colorAreaDims.height * 100,
        a: alphaSlider.value / 100 };

        var rgba = HSVAtoRGBA(hsva);

        updateMarkerA11yLabel(hsva.s, hsva.v);
        updateColor(rgba, hsva);
        pickColor();
    }

    /**
     * Update the color marker's accessibility label.
     * @param {number} saturation
     * @param {number} value
     */
    function updateMarkerA11yLabel(saturation, value) {
        var label = settings.a11y.marker;

        saturation = saturation.toFixed(1) * 1;
        value = value.toFixed(1) * 1;
        label = label.replace('{s}', saturation);
        label = label.replace('{v}', value);
        colorMarker.setAttribute('aria-label', label);
    }

    //
    /**
     * Get the pageX and pageY positions of the pointer.
     * @param {object} event The MouseEvent or TouchEvent object.
     * @return {object} The pageX and pageY positions.
     */
    function getPointerPosition(event) {
        return {
        pageX: event.changedTouches ? event.changedTouches[0].pageX : event.pageX,
        pageY: event.changedTouches ? event.changedTouches[0].pageY : event.pageY };

    }

    /**
     * Move the color marker when dragged.
     * @param {object} event The MouseEvent object.
     */
    function moveMarker(event) {
        var pointer = getPointerPosition(event);
        var x = pointer.pageX - colorAreaDims.x;
        var y = pointer.pageY - colorAreaDims.y;

        if (container) {
        y += container.scrollTop;
        }

        setMarkerPosition(x, y);

        // Prevent scrolling while dragging the marker
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * Move the color marker when the arrow keys are pressed.
     * @param {number} offsetX The horizontal amount to move.
     * @param {number} offsetY The vertical amount to move.
     */
    function moveMarkerOnKeydown(offsetX, offsetY) {
        var x = colorMarker.style.left.replace('px', '') * 1 + offsetX;
        var y = colorMarker.style.top.replace('px', '') * 1 + offsetY;

        setMarkerPosition(x, y);
    }

    /**
     * Set the color marker's position.
     * @param {number} x Left position.
     * @param {number} y Top position.
     */
    function setMarkerPosition(x, y) {
        // Make sure the marker doesn't go out of bounds
        x = x < 0 ? 0 : x > colorAreaDims.width ? colorAreaDims.width : x;
        y = y < 0 ? 0 : y > colorAreaDims.height ? colorAreaDims.height : y;

        // Set the position
        colorMarker.style.left = x + "px";
        colorMarker.style.top = y + "px";

        // Update the color
        setColorAtPosition(x, y);

        // Make sure the marker is focused
        colorMarker.focus();
    }

    /**
     * Update the color picker's input field and preview thumb.
     * @param {Object} rgba Red, green, blue and alpha values.
     * @param {Object} [hsva] Hue, saturation, value and alpha values.
     */
    function updateColor(rgba, hsva) {if (rgba === void 0) {rgba = {};}if (hsva === void 0) {hsva = {};}
        var format = settings.format;

        for (var key in rgba) {
        currentColor[key] = rgba[key];
        }

        for (var _key in hsva) {
        currentColor[_key] = hsva[_key];
        }

        var hex = RGBAToHex(currentColor);
        var opaqueHex = hex.substring(0, 7);

        colorMarker.style.color = opaqueHex;
        alphaMarker.parentNode.style.color = opaqueHex;
        alphaMarker.style.color = hex;
        colorPreview.style.color = hex;

        // Force repaint the color and alpha gradients as a workaround for a Google Chrome bug
        colorArea.style.display = 'none';
        colorArea.offsetHeight;
        colorArea.style.display = '';
        alphaMarker.nextElementSibling.style.display = 'none';
        alphaMarker.nextElementSibling.offsetHeight;
        alphaMarker.nextElementSibling.style.display = '';

        if (format === 'mixed') {
        format = currentColor.a === 1 ? 'hex' : 'rgb';
        } else if (format === 'auto') {
        format = currentFormat;
        }

        switch (format) {
        case 'hex':
            // colorValue.value = hex;
            break;
        case 'rgb':
            color_picker_rgb_input_r.value = currentColor.r
            color_picker_rgb_input_g.value = currentColor.g
            color_picker_rgb_input_b.value = currentColor.b
            color_picker_hex_input.value = hex;
            break;
        case 'hsl':
            // colorValue.value = HSLAToStr(HSVAtoHSLA(currentColor));
        break;}


        // Select the current format in the format switcher
        document.querySelector(".clr-format [value=\"" + format + "\"]").checked = true;
    }

    /**
     * Set the hue when its slider is moved.
     */
    function setHue() {
        var hue = hueSlider.value * 1;
        var x = colorMarker.style.left.replace('px', '') * 1;
        var y = colorMarker.style.top.replace('px', '') * 1;

        picker.style.color = "hsl(" + hue + ", 100%, 50%)";
        hueMarker.style.left = hue / 360 * 100 + "%";

        setColorAtPosition(x, y);
    }

    /**
     * Set the alpha when its slider is moved.
     */
    function setAlpha() {
        var alpha = alphaSlider.value / 100;

        alphaMarker.style.left = alpha * 100 + "%";
        updateColor({ a: alpha });
        pickColor();
    }

    /**
     * Convert HSVA to RGBA.
     * @param {object} hsva Hue, saturation, value and alpha values.
     * @return {object} Red, green, blue and alpha values.
     */
    function HSVAtoRGBA(hsva) {
        var saturation = hsva.s / 100;
        var value = hsva.v / 100;
        var chroma = saturation * value;
        var hueBy60 = hsva.h / 60;
        var x = chroma * (1 - Math.abs(hueBy60 % 2 - 1));
        var m = value - chroma;

        chroma = chroma + m;
        x = x + m;

        var index = Math.floor(hueBy60) % 6;
        var red = [chroma, x, m, m, x, chroma][index];
        var green = [x, chroma, chroma, x, m, m][index];
        var blue = [m, m, x, chroma, chroma, x][index];

        return {
        r: Math.round(red * 255),
        g: Math.round(green * 255),
        b: Math.round(blue * 255),
        a: hsva.a };

    }

    /**
     * Convert HSVA to HSLA.
     * @param {object} hsva Hue, saturation, value and alpha values.
     * @return {object} Hue, saturation, lightness and alpha values.
     */
    function HSVAtoHSLA(hsva) {
        var value = hsva.v / 100;
        var lightness = value * (1 - hsva.s / 100 / 2);
        var saturation;

        if (lightness > 0 && lightness < 1) {
        saturation = Math.round((value - lightness) / Math.min(lightness, 1 - lightness) * 100);
        }

        return {
        h: hsva.h,
        s: saturation || 0,
        l: Math.round(lightness * 100),
        a: hsva.a };

    }

    /**
     * Convert RGBA to HSVA.
     * @param {object} rgba Red, green, blue and alpha values.
     * @return {object} Hue, saturation, value and alpha values.
     */
    function RGBAtoHSVA(rgba) {
        var red = rgba.r / 255;
        var green = rgba.g / 255;
        var blue = rgba.b / 255;
        var xmax = Math.max(red, green, blue);
        var xmin = Math.min(red, green, blue);
        var chroma = xmax - xmin;
        var value = xmax;
        var hue = 0;
        var saturation = 0;

        if (chroma) {
        if (xmax === red) {hue = (green - blue) / chroma;}
        if (xmax === green) {hue = 2 + (blue - red) / chroma;}
        if (xmax === blue) {hue = 4 + (red - green) / chroma;}
        if (xmax) {saturation = chroma / xmax;}
        }

        hue = Math.floor(hue * 60);

        return {
        h: hue < 0 ? hue + 360 : hue,
        s: Math.round(saturation * 100),
        v: Math.round(value * 100),
        a: rgba.a };

    }

    /**
     * Parse a string to RGBA.
     * @param {string} str String representing a color.
     * @return {object} Red, green, blue and alpha values.
     */
    function strToRGBA(str) {
        var regex = /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i;
        var match, rgba;

        // Default to black for invalid color strings
        ctx.fillStyle = '#000';

        // Use canvas to convert the string to a valid color string
        ctx.fillStyle = str;
        match = regex.exec(ctx.fillStyle);

        if (match) {
        rgba = {
            r: match[3] * 1,
            g: match[4] * 1,
            b: match[5] * 1,
            a: match[6] * 1 };


        } else {
        match = ctx.fillStyle.replace('#', '').match(/.{2}/g).map(function (h) {return parseInt(h, 16);});
        rgba = {
            r: match[0],
            g: match[1],
            b: match[2],
            a: 1 };

        }

        return rgba;
    }

    /**
     * Convert RGBA to Hex.
     * @param {object} rgba Red, green, blue and alpha values.
     * @return {string} Hex color string.
     */
    function RGBAToHex(rgba) {
        var R = rgba.r.toString(16);
        var G = rgba.g.toString(16);
        var B = rgba.b.toString(16);
        var A = '';

        if (rgba.r < 16) {
        R = '0' + R;
        }

        if (rgba.g < 16) {
        G = '0' + G;
        }

        if (rgba.b < 16) {
        B = '0' + B;
        }

        if (settings.alpha && (rgba.a < 1 || settings.forceAlpha)) {
        var alpha = rgba.a * 255 | 0;
        A = alpha.toString(16);

        if (alpha < 16) {
            A = '0' + A;
        }
        }

        return '#' + R + G + B + A;
    }

    /**
     * Convert RGBA values to a CSS rgb/rgba string.
     * @param {object} rgba Red, green, blue and alpha values.
     * @return {string} CSS color string.
     */
    function RGBAToStr(rgba) {
        if (!settings.alpha || rgba.a === 1 && !settings.forceAlpha) {
        return "rgb(" + rgba.r + "," + rgba.g + "," + rgba.b +")";
        } else {
        return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
        }
    }

    /**
     * Convert HSLA values to a CSS hsl/hsla string.
     * @param {object} hsla Hue, saturation, lightness and alpha values.
     * @return {string} CSS color string.
     */
    function HSLAToStr(hsla) {
        if (!settings.alpha || hsla.a === 1 && !settings.forceAlpha) {
        return "hsl(" + hsla.h + ", " + hsla.s + "%, " + hsla.l + "%)";
        } else {
        return "hsla(" + hsla.h + ", " + hsla.s + "%, " + hsla.l + "%, " + hsla.a + ")";
        }
    }

    /**
     * Init the color picker.
     */
    function init() {
        // Render the UI
        container = undefined;
        picker = document.createElement('div');
        picker.setAttribute('id', 'clr-picker');
        picker.className = 'clr-picker';
        picker.innerHTML =
        // "<input id=\"clr-color-value\" name=\"clr-color-value\" class=\"clr-color\" type=\"text\" value=\"\" spellcheck=\"false\" aria-label=\"" + settings.a11y.input + "\">" + 
        ("<div id=\"clr-color-area\" class=\"clr-gradient\" role=\"application\" aria-label=\"" +
        settings.a11y.instruction + "\">") +
        '<div id="clr-color-marker" class="clr-marker" tabindex="0"></div>' +
        '</div>' +
        '<div class="clr-hue">' + ("<input id=\"clr-hue-slider\" name=\"clr-hue-slider\" type=\"range\" min=\"0\" max=\"360\" step=\"1\" aria-label=\"" +
        settings.a11y.hueSlider + "\">") +
        '<div id="clr-hue-marker"></div>' +
        '</div>' +
        '<div class="clr-alpha">' + ("<input id=\"clr-alpha-slider\" name=\"clr-alpha-slider\" type=\"range\" min=\"0\" max=\"100\" step=\"1\" aria-label=\"" +
        settings.a11y.alphaSlider + "\">") +
        '<div id="clr-alpha-marker"></div>' +
        '<span></span>' +
        '</div>' +
        '<div id="clr-format" class="clr-format">' +
        '<fieldset class="clr-segmented">' + ("<legend>" +
        settings.a11y.format + "</legend>") +
        '<input id="clr-f1" type="radio" name="clr-format" value="hex">' +
        '<label for="clr-f1">Hex</label>' +
        '<input id="clr-f2" type="radio" name="clr-format" value="rgb">' +
        '<label for="clr-f2">RGB</label>' +
        '<input id="clr-f3" type="radio" name="clr-format" value="hsl">' +
        '<label for="clr-f3">HSL</label>' +
        '<span></span>' +
        '</fieldset>' +
        '</div>' +
        '<div class="w100p row alnC jstfyC mT10">'+
        '<div class="color_picker_format_switch color_picker_format_switch_selected" color_format="rgb">RGB</div><div class="color_picker_format_switch" color_format="hex">HEX</div>'+
        '</div>'+
        '<div class="color_picker_rgb_inputs">'+
        '<div class="color_picker_rgb_input_container"><div>R</div><input class="color_picker_rgb_input" id="color_picker_rgb_input_r" spellcheck=\"false\" /></div>'+
        '<div class="color_picker_rgb_input_container"><div>G</div><input class="color_picker_rgb_input" id="color_picker_rgb_input_g" spellcheck=\"false\" /></div>'+
        '<div class="color_picker_rgb_input_container"><div>B</div><input class="color_picker_rgb_input" id="color_picker_rgb_input_b" spellcheck=\"false\" /></div>'+
        '</div>'+
        '<div class="color_picker_hex_inputs none">'+
        '<div class="color_picker_hex_input_container"><div>HEX</div><input class="color_picker_hex_input" id="color_picker_hex_input" spellcheck=\"false\" /></div>'+
        '</div>'+
        '<div id="clr-swatches" class="clr-swatches"></div>' + ("<button type=\"button\" id=\"clr-clear\" class=\"clr-clear btn btn-cancel\" aria-label=\"" +
        settings.a11y.clear + "\">" + settings.clearLabel + "</button>") +
        '<div id="clr-color-preview" class="clr-preview">' + ("<button type=\"button\" id=\"clr-close\" class=\"clr-close\" aria-label=\"" +
        settings.a11y.close + "\">" + settings.closeLabel + "</button>") +
        '</div>' + ("<span id=\"clr-open-label\" hidden>" +
        settings.a11y.open + "</span>") + ("<span id=\"clr-swatch-label\" hidden>" +
        settings.a11y.swatch + "</span>");

        // Append the color picker to the DOM
        document.body.appendChild(picker);

        // Reference the UI elements
        colorArea = getEl('clr-color-area');
        colorMarker = getEl('clr-color-marker');
        clearButton = getEl('clr-clear');
        closeButton = getEl('clr-close');
        colorPreview = getEl('clr-color-preview');
        color_picker_hex_input = getEl('color_picker_hex_input')
        color_picker_rgb_input_r = getEl('color_picker_rgb_input_r');
        color_picker_rgb_input_g = getEl('color_picker_rgb_input_g');
        color_picker_rgb_input_b = getEl('color_picker_rgb_input_b');
        hueSlider = getEl('clr-hue-slider');
        hueMarker = getEl('clr-hue-marker');
        alphaSlider = getEl('clr-alpha-slider');
        alphaMarker = getEl('clr-alpha-marker');

        // Bind the picker to the default selector
        bindFields(settings.el);
        wrapFields(settings.el);

        addListener(picker, 'mousedown', function (event) {
        picker.classList.remove('clr-keyboard-nav');
        // event.stopPropagation();
        });

        addListener(colorArea, 'mousedown', function (event) {
        addListener(document, 'mousemove', moveMarker);
        });

        addListener(colorArea, 'touchstart', function (event) {
        document.addEventListener('touchmove', moveMarker, { passive: false });
        });

        addListener(colorMarker, 'mousedown', function (event) {
        addListener(document, 'mousemove', moveMarker);
        });

        addListener(colorMarker, 'touchstart', function (event) {
        document.addEventListener('touchmove', moveMarker, { passive: false });
        });

        addListener(color_picker_rgb_input_r, 'input', function (event) {
            var value = `rgb(${color_picker_rgb_input_r.value},${color_picker_rgb_input_g.value},${color_picker_rgb_input_b.value})`;
            
            if (currentEl || settings.inline) {
                var color = value === '' ? value : setColorFromStr(value);
                pickColor(color);
            }
        });
        addListener(color_picker_rgb_input_g, 'input', function (event) {
            var value = `rgb(${color_picker_rgb_input_r.value},${color_picker_rgb_input_g.value},${color_picker_rgb_input_b.value})`;
            
            if (currentEl || settings.inline) {
                var color = value === '' ? value : setColorFromStr(value);
                pickColor(color);
            }
        });
        addListener(color_picker_rgb_input_b, 'input', function (event) {
            var value = `rgb(${color_picker_rgb_input_r.value},${color_picker_rgb_input_g.value},${color_picker_rgb_input_b.value})`;
            
            if (currentEl || settings.inline) {
                var color = value === '' ? value : setColorFromStr(value);
                pickColor(color);
            }
        });
        addListener(color_picker_hex_input, 'change', function (event) {
            var value = color_picker_hex_input.value;
            if (currentEl || settings.inline) {
                var color = value === '' ? value : setColorFromStr(value);
                pickColor(color);
            }
        });
        addListener(clearButton, 'click', function (event) {
        pickColor('');
        closePicker();
        });

        addListener(closeButton, 'click', function (event) {
        pickColor();
        closePicker();
        });

        addListener(getEl('clr-format'), 'click', '.clr-format input', function (event) {
        currentFormat = event.target.value;
        updateColor();
        pickColor();
        });

        addListener(picker, 'click', '.clr-swatches button', function (event) {
        setColorFromStr(event.target.textContent);
        pickColor();

        if (settings.swatchesOnly) {
            closePicker();
        }
        });

        addListener(document, 'mouseup', function (event) {
        document.removeEventListener('mousemove', moveMarker);
        });

        addListener(document, 'touchend', function (event) {
        document.removeEventListener('touchmove', moveMarker);
        });

        addListener(document, 'mousedown', function (event) {
        keyboardNav = false;
        picker.classList.remove('clr-keyboard-nav');
        if($('#clr-picker:hover').length == 0 ){
            closePicker();
        }
        });

        addListener(document, 'keydown', function (event) {
        var key = event.key;
        var target = event.target;
        var shiftKey = event.shiftKey;
        var navKeys = ['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

        if (key === 'Escape') {
            closePicker(true);

            // Display focus rings when using the keyboard
        } else if (navKeys.includes(key)) {
            keyboardNav = true;
            picker.classList.add('clr-keyboard-nav');
        }

        // Trap the focus within the color picker while it's open
        if (key === 'Tab' && target.matches('.clr-picker *')) {
            var focusables = getFocusableElements();
            var firstFocusable = focusables.shift();
            var lastFocusable = focusables.pop();

            if (shiftKey && target === firstFocusable) {
            lastFocusable.focus();
            event.preventDefault();
            } else if (!shiftKey && target === lastFocusable) {
            firstFocusable.focus();
            event.preventDefault();
            }
        }
        });

        addListener(document, 'click', '.clr-field button', function (event) {
        // Reset any previously set per-instance options
        if (hasInstance) {
            resetVirtualInstance();
        }

        // Open the color picker
        event.target.nextElementSibling.dispatchEvent(new Event('click', { bubbles: true }));
        });

        addListener(colorMarker, 'keydown', function (event) {
        var movements = {
            ArrowUp: [0, -1],
            ArrowDown: [0, 1],
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0] };


        if (Object.keys(movements).includes(event.key)) {
            moveMarkerOnKeydown.apply(void 0, movements[event.key]);
            event.preventDefault();
        }
        });

        addListener(colorArea, 'click', moveMarker);
        addListener(hueSlider, 'input', setHue);
        addListener(alphaSlider, 'input', setAlpha);
    }

    /**
     * Return a list of focusable elements within the color picker.
     * @return {array} The list of focusable DOM elemnts.
     */
    function getFocusableElements() {
        var controls = Array.from(picker.querySelectorAll('input, button'));
        var focusables = controls.filter(function (node) {return !!node.offsetWidth;});

        return focusables;
    }

    /**
     * Shortcut for getElementById to optimize the minified JS.
     * @param {string} id The element id.
     * @return {object} The DOM element with the provided id.
     */
    function getEl(id) {
        return document.getElementById(id);
    }

    /**
     * Shortcut for addEventListener to optimize the minified JS.
     * @param {object} context The context to which the listener is attached.
     * @param {string} type Event type.
     * @param {(string|function)} selector Event target if delegation is used, event handler if not.
     * @param {function} [fn] Event handler if delegation is used.
     */
    function addListener(context, type, selector, fn) {
        var matches = Element.prototype.matches || Element.prototype.msMatchesSelector;

        // Delegate event to the target of the selector
        if (typeof selector === 'string') {
        context.addEventListener(type, function (event) {
            if (matches.call(event.target, selector)) {
            fn.call(event.target, event);
            }
        });

        // If the selector is not a string then it's a function
        // in which case we need a regular event listener
        } else {
        fn = selector;
        context.addEventListener(type, fn);
        }
    }

    /**
     * Call a function only when the DOM is ready.
     * @param {function} fn The function to call.
     * @param {array} [args] Arguments to pass to the function.
     */
    function DOMReady(fn, args) {
        args = args !== undefined ? args : [];

        if (document.readyState !== 'loading') {
        fn.apply(void 0, args);
        } else {
        document.addEventListener('DOMContentLoaded', function () {
            fn.apply(void 0, args);
        });
        }
    }

    // Polyfill for Nodelist.forEach
    if (NodeList !== undefined && NodeList.prototype && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

    // Expose the color picker to the global scope
    window.Coloris = function () {
        var methods = {
        set: configure,
        wrap: wrapFields,
        close: closePicker,
        setInstance: setVirtualInstance,
        removeInstance: removeVirtualInstance,
        updatePosition: updatePickerPosition,
        ready: DOMReady };


        function Coloris(options) {
        DOMReady(function () {
            if (options) {
            if (typeof options === 'string') {
                bindFields(options);
            } else {
                configure(options);
            }
            }
        });
        }var _loop2 = function _loop2(

        key) {
        Coloris[key] = function () {for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {args[_key2] = arguments[_key2];}
            DOMReady(methods[key], args);
        };};for (var key in methods) {_loop2(key);
        }

        return Coloris;
    }();

    // Init the color picker when the DOM is ready
    DOMReady(init);

})(window, document, Math);

rgbToHex = function (rgb) {
    rgb = rgb.split("(")[1].split(")")[0];
    rgb = rgb.split(",");
    return "#" + (1 << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2]).toString(16).slice(1);
}
draw_color_picker = function(data){
    let editor = $('<div/>',{
        class:`editor color_picker_editor ${data.editor_class ?? ''} ${data.dummy === true ? 'dummy_editor' : ''} ${data.dummy === true ? data.dummy_class : ''}`,
        key_tree:data.key_tree,
        variable_key:data.variable_key,
        key:data.key,
        alpha:data.alpha == false ? '0' : '1',
        render:data.render ?? data.key_tree,
    })
    return editor;
}
set_color_picker = function(editor){
    if(editor.hasClass('dummy_editor')){return;}
    let val = get_editor_val(editor);
    if(val == '--'){
        editor.css('background-color','');
        editor.attr('color_var','--')
    }else{
        editor.css('background-color',val);
        editor.attr('color_var',val)
    }
    if(!$('.color_picker_editor_popup').hasClass('none')){
        try{
            let val = get_editor_val(window.selected_color_picker_editor);
            val = val.replace('rgba(var(--','').replaceAll(')','').split(',') 
            $(`.color_picker_editor_color`).removeClass('color_picker_editor_color_selected')
            $(`.color_picker_editor_color[key="${val[0]}"]`).addClass('color_picker_editor_color_selected')
            set_dummy_select_range($('.color_picker_editor_transparency'),val[1],true);
            set_color_picker_editor_colors();
        }catch{
            $(`.color_picker_editor_color`).removeClass('color_picker_editor_color_selected')
            set_dummy_select_range($('.color_picker_editor_transparency'),'1',true);
            set_color_picker_editor_colors();
            // $('.color_picker_editor_popup').text('').addClass('none')
        }
    }
}
set_dummy_color_picker = function(editor,val){
    if(val == '--'){
            editor.css('background-color','');
        }else{
        editor.css('background-color',val);
    }
    editor.attr('color_var',val)
    if(editor.is(window.selected_color_picker_editor)){
        try{
            val = val.replace('rgba(var(--','').replaceAll(')','').split(',') 
            $(`.color_picker_editor_color`).removeClass('color_picker_editor_color_selected')
            $(`.color_picker_editor_color[key="${val[0]}"]`).addClass('color_picker_editor_color_selected')
            set_dummy_select_range($('.color_picker_editor_transparency'),val[1],true);
            set_color_picker_editor_colors();
        }catch{
            $(`.color_picker_editor_color`).removeClass('color_picker_editor_color_selected')
            set_dummy_select_range($('.color_picker_editor_transparency'),'1',true);
            set_color_picker_editor_colors();
            // $('.color_picker_editor_popup').text('').addClass('none')
        }
    }
}
draw_color_picker_popup = function(){
    $('.color_picker_editor_popup').text('').append(
        $('<div/>',{class:'color_picker_editor_popup_palette'}),
        $('<div/>',{class:'color_picker_editor_popup_custom_colors'}).append(
            $('<button/>',{class:'color_picker add_custom_color ico-plus m0',tooltip:texts.website_style.add_color}),
        ),
        $('<div/>',{class:'color_picker_editor_transparency_container w100p'}).append(
            $('<div/>',{class:'fs09 mT30',text:texts.styling.transparency}),
            draw_select_range({
                dummy:true,
                dummy_class:'color_picker_editor_transparency',
                range:{min:0,max:1,step:.1},
                unit:'',
            }),
        ),
        $('<div/>',{class:'w100p row alnC jstfyE mT20'}).append(
            $('<button/>',{class:'btn btn-cancel m0 mT10 btn_small website_style_elem',elem:'website_colors',text:texts.website_style.manage_website_colors})
        )
    )
    for(const key in window.template.website_colors.colors){
        $('.color_picker_editor_popup_palette').append(
            $('<div/>',{class:'color_picker_editor_color',style:``,key:key,color_type:'palette'})
        )
    }
    for(const key in window.template.website_colors.custom_colors){
        $('.color_picker_editor_popup_custom_colors').find('.add_custom_color').before(
            $('<div/>',{class:'color_picker_editor_color',style:``,key:key,custom_color_name:key,color_type:'custom'})
        )
    }
}
set_color_picker_editor_colors = function(){
    $('.color_picker_editor_color').each(function(){
        let color;
        if($(this).attr('color_type') == 'palette'){
            color = window.template.website_colors.colors[$(this).attr('key')]
        }else if($(this).attr('color_type') == 'custom'){
            color = window.template.website_colors.custom_colors[$(this).attr('key')]
            $(this).val(`rgb(${color.r},${color.g},${color.b})`);
        }
        $(this).css('background-color',`rgba(${color.r},${color.g},${color.b},${get_dummy_val($('.color_picker_editor_transparency'))})`)
    })
}
$('body').on('mouseup','.color_picker_editor',function(){
    window.selected_color_picker_editor = $(this);
    let val;
    if($(this).hasClass('dummy_editor')){
        val = $(this).attr('color_var');
    }else{
        val = get_editor_val(window.selected_color_picker_editor);
    }
    if(val == '--'){
        $(`.color_picker_editor_color`).removeClass('color_picker_editor_color_selected')
        $('.color_picker_editor_popup').css({
            left:parseFloat($(this).offset().left) + parseFloat($(this).outerWidth()),
            top:$(this).offset().top,
        }).removeClass('none')
        set_dummy_select_range($('.color_picker_editor_transparency'),'1',true)
        set_color_picker_editor_colors();
    }else{
        if(typeof(val) === 'undefined' || val == ''){
            val = 'rgba(var(--),1)'
        }
        val = val.replace('rgba(var(--','').replaceAll(')','').split(',')    
        $(`.color_picker_editor_color`).removeClass('color_picker_editor_color_selected')
        $(`.color_picker_editor_color[key="${val[0]}"]`).addClass('color_picker_editor_color_selected')
        $('.color_picker_editor_popup').css({
            left:parseFloat($(this).offset().left) + parseFloat($(this).outerWidth()),
            top:$(this).offset().top 
        }).removeClass('none')
        set_dummy_select_range($('.color_picker_editor_transparency'),val[1],true)
        set_color_picker_editor_colors();
    }
    if(parseFloat($('.color_picker_editor_popup').offset().left) + parseFloat($('.color_picker_editor_popup').width()) > $(window).width()){
        $('.color_picker_editor_popup').css('left',parseFloat($(this).offset().left) - parseFloat($(this).width()) - parseFloat($('.color_picker_editor_popup').width()))
    }
    if(window.selected_color_picker_editor.attr('alpha') == 0){
        $('.color_picker_editor_transparency_container').addClass('none')
    }else{
        $('.color_picker_editor_transparency_container').removeClass('none')
    }

    if(parseFloat($('.color_picker_editor_popup').offset().top) + parseFloat($('.color_picker_editor_popup').height()) > $(window).height()){
        $('.color_picker_editor_popup').css('top',parseFloat($(this).offset().top) - parseFloat($('.color_picker_editor_popup').outerHeight()) - $(this).outerHeight())
    }

})
$('body').on('mouseup','.color_picker_editor_color',function(e){
    if(!$(this).hasClass('color_picker_editor_color_selected')){
        e.stopPropagation();
    }
    let new_val;
    new_val = `rgba(var(--${$(this).attr('key')}),${get_dummy_val($('.color_picker_editor_transparency'))})`;
    if(window.selected_color_picker_editor.hasClass('dummy_editor')){
        $('.color_picker_editor_color').removeClass('color_picker_editor_color_selected')
        $(this).addClass('color_picker_editor_color_selected')
        set_dummy_color_picker(window.selected_color_picker_editor,new_val)
    }else{
        set_val(window.selected_color_picker_editor,new_val);
        new_action(window.selected_color_picker_editor.attr('render'));
        set_color_picker(window.selected_color_picker_editor)

    }
    window.selected_color_picker_editor.trigger('change')
})
$('body').on('change','.color_picker_editor_transparency',function(){
    let new_val;
    let val;
    if(window.selected_color_picker_editor.hasClass('dummy_editor')){
        val = window.selected_color_picker_editor.attr('color_var')
    }else{
        val = get_editor_val(window.selected_color_picker_editor);
    }
    if(typeof(val) === 'undefined'){
        val = 'rgba(var(--),1)'
    }
    val = val.replace('rgba(var(--','').replaceAll(')','').split(',')  
    new_val = `rgba(var(--${val[0]}),${get_dummy_val($('.color_picker_editor_transparency'))})`;

    if(window.selected_color_picker_editor.hasClass('dummy_editor')){
        set_dummy_color_picker(window.selected_color_picker_editor,new_val)
        set_color_picker_editor_colors();
    }else{
        set_val(window.selected_color_picker_editor,new_val);
        set_color_picker_editor_colors();
        new_action(window.selected_color_picker_editor.attr('render'));
        set_color_picker(window.selected_color_picker_editor)
    }
    window.selected_color_picker_editor.trigger('change')
})
//events
$(document).on('open','.color_picker',function(){
    $('.color_picker').attr('is_selected','0')
    $(this).attr('is_selected','1')
    $('#clr-picker').find('.remove_custom_color').remove();
    $('#clr-picker').find('.website_color_picker_gradation_c').remove();
    $('#clr-picker').find('.add_custom_color_confirm').remove();
    
})
$(document).on('close','.color_picker',function(){
    $('.color_picker').attr('is_selected','0')
    $('#clr-picker').find('.remove_custom_color').remove();
    $('#clr-picker').find('.website_color_picker_gradation_c').remove();
    $('#clr-picker').find('.add_custom_color_confirm').remove();
})
$('body').on('click','.color_picker_format_switch',function(){
    $('.color_picker_format_switch').removeClass('color_picker_format_switch_selected');
    $(this).addClass('color_picker_format_switch_selected');
    if($(this).attr('color_format') == 'rgb'){
        $('.color_picker_rgb_inputs').removeClass('none');
        $('.color_picker_hex_inputs').addClass('none')
    }else if($(this).attr('color_format') == 'hex'){
        $('.color_picker_rgb_inputs').addClass('none');
        $('.color_picker_hex_inputs').removeClass('none')
    }
})
