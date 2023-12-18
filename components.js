class Multiselect{
    constructor($el,options){
        console.log($el)
        this.$el = $el;
        this.id = options.hasOwnProperty("id") ? options.id : this.generateUniqueId(); 
        this.selection = []

        /* example */
        // options = {
        //     label:'My Label',
        //     choices: [
        //         ["label1","value1"],
        //         ["label2","value2"],
        //         ["label3","value3"],
        //         ["label4","value4"]
        //     ]
        // }

        // validate options
        if(!options.hasOwnProperty('choices')){
            options['choices'] = [
                ["Select an option","",{ disabled: true}]
            ]
        }

        this.options = options;

    }

    // multiselect
    renderMultiselectTemplate(el = this.$el){

        let selectOptions = ``
        
        this.options.choices.forEach((element,index)=>{
            selectOptions+=`
            <div class="custom-multiselect-input-dropdown-options">
                <label for="${this.id}_${index}" ${element.length>2 ? element[2].disabled ? "class='input-disabled'" : "" : ""}>${element[0]}</label>
                <input type="checkbox" ${element.length>2? element[2].disabled ? "disabled" : "" : ""} class="custom-multiselect-input-main-checkbox" id="${this.id}_${index}" value="${element[1]}"/>
            </div>`
        })

        el.html(`
        <div class="custom-multiselect-item" id="${this.id}">
            <label for="${this.id}">${this.options.hasOwnProperty('label') ? this.options.label : ""}</label>
            <div class="custom-multiselect-input">
                <div class="custom-multiselect-input-main" >
                </div> 
                <div class="custom-multiselect-input-dropdown">
                    ${selectOptions}
                </div>
            </div>
        </div>
        `)

        el.addClass('custom-multiselect')

        
        this.handlers()
    }


    handlers(){
        const self = this
        $(`#${this.id} .custom-multiselect-input-main-checkbox`).on('change',function(){
            const value=$(this).val()
            if($(this).prop('checked')){
                self.addSelection(value)
            }
            else{
                self.removeSelection(value)
            }
        })

        $(`#${this.id} .custom-multiselect-input-main`).on('click',function(){
            if($(this).hasClass('focused')){
                $(this).siblings('.custom-multiselect-input-dropdown').hide()
                $(this).removeClass('focused')
            }
            else{
                $(this).siblings('.custom-multiselect-input-dropdown').show()
                const self = $(this)
                setTimeout(function(){
                    self.addClass('focused')
                },100)
            }
            // $(this).siblings('.custom-multiselect-input-dropdown').show()
        })
    }

    addSelection(value){
        this.selection.push(value)
        this.renderSelection()
        return this.selection
    }

    removeSelection(value){
        this.selection.splice(this.selection.indexOf(value),1)
        this.renderSelection()
        return this.selection
    }

    getSelection(){
        return this.selection
    }


    renderSelection(){
        let html = ``

        this.selection.forEach((element,index)=>{
            if(index<=1){
                html += `<span class="custom-multiselect-selection" data-value="${element}">${element}</span>`
            }
        })
        if(this.selection.length >2){

            html += `<span class="custom-multiselect-selection" data-value="${this.selection.length - 2}">+${this.selection.length-2}</span>`
        }

        $(`#${this.id} .custom-multiselect-input-main`).html(html)
    }
    // helper

    generateUniqueId() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let uniqueId = '';
    
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            uniqueId += characters.charAt(randomIndex);
        }
    
        return uniqueId;
    }
    
}

class StaticSelection{
    constructor($el,options){
        console.log($el)
        this.$el = $el;
        this.id = options.hasOwnProperty("id") ? options.id : this.generateUniqueId(); 
        this.selection = []



        this.handlers()
    }

    handlers(){
        
    }
}