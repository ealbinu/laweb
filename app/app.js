var vm = new Vue ({
    el: '#app',
    data () {
        return {
            screen: 1,
            au1: false,
            au2: false,
            au3: false,
            au4: false,
            au5: false,
            errorSound: null,
            okSound: null,
            cudistatus: 'idle',
        }
    },
    methods: {
        screenup () {
            this.screen++
            if(this.screen == 4){
                this.dragfn()
            }
        },
        dragfn () {
            var _this = this
            setTimeout(function (){
                const droppable = new Draggable.Droppable(document.querySelectorAll('.dzones'), {
                    draggable: '.concepto',
                    dropzone: '.dropzone'
                })
                droppable.on('droppable:dropped', function (event) {
                    let source = event.data.dragEvent.source.getAttribute('data')
                    let dropzone = event.data.dropzone.getAttribute('data')
                    if(dropzone!=undefined){
                        if(source == dropzone){
                            //OK
                        } else if(source == 'dc'){
                            //OK
                        } else {
                            //_this.errorSound.play()
                            event.cancel()

                        }
                    }
                }) //:dropped


                droppable.on('droppable:stop', function (event) {
                    let dropzoneisok = event.data.dropzone.classList.contains('dz')
                    if(dropzoneisok){
                        _this.okSound.play()
                        _this.cudistatus = 'ok'
                        setTimeout(function () { _this.cudistatus = 'idle' },1000)
                        setTimeout(function () {
                            let oks = document.querySelectorAll('.dz.draggable-dropzone--occupied').length
                            if(oks == 10){
                                console.log('OKS!!!')
                                _this.screen = 5
                            }
                        }, 300)
                    } else {
                        _this.errorSound.play()
                        _this.cudistatus = 'error'
                        setTimeout(function () { _this.cudistatus = 'idle' },1000)
                    }
                })

            }, 500)// timeout
        }
    },
    mounted () {
        this.errorSound = new Howl({
            src: ['app/s/error.mp3'],
        })
        this.okSound = new Howl({
            src: ['app/s/ok.mp3'],
        })
    }
})





