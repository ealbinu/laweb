Vue.component('sprites',{
    props: ['s', 'speed', 'autoplay', 'anim', 'exitanim', 'path', 'ext'],
    data () {
        return {
            playing: true,
            raf: null,
            frame: 0,
            currentAnim: ''
        }
    },
    methods: {
        play () {
            this.raf = requestAnimationFrame(this.run)
        },
        stop () {
            cancelAnimationFrame(this.raf)
        },
        run () {
            var _this = this
            _this.frame++
            _this.currentAnim = _this.anim
            if(_this.frame>=_this.s.length){
                _this.frame = 0
            }
            setTimeout(function () {
                _this.currentAnim = _this.exitanim
            }, this.speed - (this.speed / 4))
            setTimeout(function () {
                requestAnimationFrame(_this.run)
            }, this.speed)
        },

    },
    mounted () {
        if(this.autoplay!=undefined || this.autoplay==true){
            var _this = this
            _this.currentAnim = _this.anim
            setTimeout(function (){
                _this.play()
            }, _this.speed)
        }
    },
    template: `
        <div class="sprites">
            <img v-for="(i, index) in s" :class="currentAnim" v-show="index == frame" :src="path + i + ext">
        </div>
    `
})