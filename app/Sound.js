Vue.component('sounds',{
    props: ['file', 'autoplay'],
    data () {
        return {
            sound: null,
            playing: false
        }
    },
    methods: {
        play () {
            this.sound.play()
            this.playing = true
        },
        stop () {
            this.sound.stop()
            this.playing = false
            this.$emit('completed')
        },
    },
    mounted () {
        var _this = this
        _this.sound = new Howl({
            src: [_this.file],
            onend: function () {
                _this.$emit('completed')
                _this.playing = false
            }
        })
        if(this.autoplay!=undefined || this.autoplay==true) {
            this.play()
        }
    },
    template: `
        <div class="sounds">
            <div class="sounds-playing" @click="stop" v-show="playing">
                <lottie-player key="playing" src="app/i/audioline.json" background="transparent" loop autoplay></lottie-player>
            </div>
            <div class="sounds-playing" @click="play" v-show="!playing">
                <lottie-player key="stopped" src="app/i/audiolinestop.json" background="transparent" loop autoplay></lottie-player>
            </div>
        </div>
    `
})