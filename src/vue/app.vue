<template>
    <div id="app">
        <div class="ma3"><a class="logo" href="/"> </a></div>
        <div class="component ph3 ma4 tc mt6 georgia">
            <p>
                The current {{ countTitle }} is
            </p>
            <div id="count" class="mb4">{{ count }}</div>
            <div>
                <a href="#" class="f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib black" @click.prevent="increment">Increment</a>
            </div>
        </div>
    </div>
</template>


<script>

    const { mapActions, mapState } = require('vuex');

    module.exports = {
        data: function () {
            return {
                countTitle: 'count',
            };
        },
        computed: {
            ...mapState([
                'count',
            ])
        },
        methods: {
            ...mapActions([
                'increment',
                'getCount',
            ]),
        },
        created: function () {
          console.log('app created.');
        },
        mounted: function () {
           console.log('app mounted.');
           this.getCount();
        },
        updated: function () {
          console.log('app updated.');
        }
    };
</script>

<style lang="sass">
    $primary-color: #333;
    .logo {
        display: block;
        background-image: url('/static/images/sphela.png');
        background-repeat: no-repeat;
        background-size: 100px auto;
        width: 250px;
        height: 100px;
    }
    #app {
        color: $primary-color;
    }
    #count {
        font-size: 100px;
    }
</style>