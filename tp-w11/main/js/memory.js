// eslint-disable-next-line no-unused-vars
const memoryModule = (function () {
    'use strict'
    class MenuDeJeu {
        static scoreIncrement () {
            const score = document.getElementById('score')
            const chrono = document.getElementById('chrono')
            const startButton = document.getElementById('start')
            score.value++
            const temp = score.value
            score.innerHTML = temp

            setTimeout(function () {
                if (score.value === '3') {
                    clearInterval(nIntervId)
                    alert('Vous avez gagner en : ' + chrono.value + ' Secondes')
                    startButton.value = 'start'
                    score.value = 0
                }
            }, 1000)
        }
    }
    let imgClicked = 0
    let firstImg = null
    let firstImgClass = null
    let nIntervId

    function compareImage (event) {
        if (event.currentTarget.classList.value !== 'img click') {
            event.currentTarget.classList.add('click')
            imgClicked++
            if (imgClicked === 1) {
                firstImg = event.currentTarget.querySelector('.theback img')
                firstImgClass = event.currentTarget
            }
            if (imgClicked === 2) {
                const current = event.currentTarget

                imgClicked = 0
                if (event.currentTarget.querySelector('.theback img').src !== firstImg.src) {
                    setTimeout(function () {
                        current.classList.remove('click')
                        firstImgClass.classList.remove('click')
                    }, 1000)
                } else {
                    MenuDeJeu.scoreIncrement()
                }
            }
        }
    }
    function timer () {
        const chrono = document.getElementById('chrono')
        chrono.value++
        const temp = chrono.value
        chrono.innerHTML = temp
    }

    function startTimer () {
        nIntervId = setInterval(timer, 1000)
    }
    function randomPic () {
        const select = document.getElementById('themes')
        let picNumbers = []
        function shuffle (array) { array.sort(() => Math.random() - 0.5) }
        const pics = document.getElementsByClassName('theback')
        if (select.options[select.selectedIndex].value === '0') {
            picNumbers = [1, 2, 3, 1, 2, 3]
        } else if (select.options[select.selectedIndex].value === '1') {
            picNumbers = [4, 5, 6, 4, 5, 6]
        } else if (select.options[select.selectedIndex].value === '2') {
            picNumbers = [7, 8, 9, 7, 8, 9]
        }

        shuffle(picNumbers)
        for (let i = 0; i < pics.length; i++) {
            pics[i].innerHTML = '<img src="../image/' + picNumbers[i] + '.jpg" alt="" />'
        }
    }
    function begin () {
        const select = document.getElementById('themes')
        const gameField = document.getElementById('gameField')
        const dataField = document.getElementById('dataField')
        const startButton = document.getElementById('start')
        const score = document.getElementById('score')
        const picList = document.getElementsByClassName('img')
        if ((isNaN(parseInt(select.options[select.selectedIndex].value))) === false) {
            gameField.style.visibility = 'visible'
            gameField.style.position = 'static'

            dataField.style.visibility = 'hidden'
            dataField.style.position = 'absolute'
            document.body.style.backgroundImage = "url('back.jpg')"
            const chrono = document.getElementById('chrono')
            chrono.value = 0
            score.value = 0
            startButton.value = 'start'

            for (let i = 0; i < picList.length; i++) {
                picList[i].classList.add('blockClick')
                picList[i].classList.remove('click')
            }
            clearInterval(nIntervId)
        } else alert('Veillez choisir un theme')
    }
    return {
        init: function () {
            const score = document.getElementById('score')
            const select = document.getElementById('themes')
            const gameField = document.getElementById('gameField')
            gameField.style.position = 'absolute'
            const submitBtn = document.getElementById('submitBtn')
            const chrono = document.getElementById('chrono')
            submitBtn.addEventListener('click', begin)
            select.addEventListener('change', function () {
                if (select.options[select.selectedIndex].value === '0') {
                    document.body.style.backgroundImage = "url('animals.png')"
                } else if (select.options[select.selectedIndex].value === '1') {
                    document.body.style.backgroundImage = "url('sport.jpg')"
                } else if (select.options[select.selectedIndex].value === '2') {
                    document.body.style.backgroundImage = "url('metier.png')"
                } else {
                    document.body.style.backgroundImage = "url('back.jpg')"
                }
            })

            const startButton = document.getElementById('start')
            startButton.addEventListener('click', function (event) {
                const picList = document.getElementsByClassName('img')
                if (startButton.value === 'start') {
                    const bestScore = document.getElementById('best')
                    console.log(bestScore.value)
                    console.log(chrono.value)
                    if (parseInt(bestScore.value) === 0 && parseInt(bestScore.value) < parseInt(chrono.value) && parseInt(chrono.value) !== 0) {
                        const temp = chrono.value
                        bestScore.value = temp
                    } else if (parseInt(bestScore.value) > parseInt(chrono.value) && parseInt(chrono.value) !== 0) {
                        const temp = chrono.value
                        bestScore.value = temp
                    }
                    chrono.value = 0
                    for (let i = 0; i < picList.length; i++) {
                        picList[i].classList.add('blockClick')
                        picList[i].classList.add('click')
                    }
                    setTimeout(function () {
                        for (let i = 0; i < picList.length; i++) {
                            picList[i].classList.remove('blockClick')
                            picList[i].classList.remove('click')
                        }
                    }, 2000)
                    randomPic()
                    startTimer()
                    startButton.value = 'stop'
                } else if (startButton.value === 'stop') {
                    clearInterval(nIntervId)
                    startButton.value = 'start'
                    score.value = 0
                    chrono.value = 0
                    for (let i = 0; i < picList.length; i++) {
                        picList[i].classList.add('blockClick')
                    }
                }
            })
            const quitButton = document.getElementById('quit')
            quitButton.addEventListener('click', function (event) {
                const gameField = document.getElementById('gameField')
                const dataField = document.getElementById('dataField')

                gameField.style.visibility = 'hidden'
                gameField.style.position = 'absolute'

                dataField.style.visibility = 'visible'
                dataField.style.position = 'static'
            })
            const picList = document.getElementsByClassName('img')
            for (let index = 0; index < picList.length; index++) {
                picList[index].addEventListener('click', function (event) {
                    compareImage(event)
                })
            }
        }
    }
})()
