import React, {Component} from 'react'

import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import Span from '../../components/UI/Span'

import PopupCustom from '../../components/UI/Popup/Popup';

import is from 'is_js'
import axios from '../../axios/axios-card'
import md5 from 'md5'


import classes from './CardForm.module.css'

function isInvalid({valid}) {
    return !valid
}

class CardForm extends Component {

    state = {
        isAnyCard:false,
        isAnyCards:[],
        isFormValid: false,
        formControls: {
            card: {
                value: '',
                type: '',
                label: '',
                errorMessage: 'Insert correct card number',
                maximumLength:19,
                valid: false,
                validation: {
                    number: true,
                    length: 19
                }
            },
            cardCode: {
                value: '',
                type: '',
                label: '',
                errorMessage: 'Insert correct code',
                maximumLength:3,
                valid: false,
                validation: {
                    number: true,
                    length: 3
                }
            }
        },
        isCardCorrect: false,
        isCardFound:false
    }

    applyHandler = async () => {
        this.setState({
            isFormValid: false
        })

        const insertNumber = this.state.formControls.card.value;

        const cardData = {
            number: md5(this.state.formControls.card.value),
            cardCode: md5(this.state.formControls.cardCode.value),
        }
        try {
            const response = await axios.get(`/cards?number=${cardData.number}`)

            if (response.data.length === 1) {
                const card = response.data[0]


                if(card.code === cardData.cardCode) {
                    const objectCard = {
                        number: insertNumber,
                        discount: card.discount
                    }

                    this.toFoundPopup()
                    this.toSaveCardData(objectCard)
                    this._toClearState()

                }else{
                    this.toNotCorrectPopup()
                    this._toClearState()
                }
            } else {
                this.toNotCorrectPopup()
                this._toClearState()
            }
        } catch(e) {
            console.log(e)
        }
    }

    toCompareData(obj1,obj2) {
        return Number(obj1.number) === Number(obj2.number)
    }

    toSaveCardData(obj) {
        let isFindCard

        this.state.isAnyCards.forEach((item) => {
            isFindCard = (obj.number === item.number)
        })

        if (!isFindCard) {
            this.setState((prevState) => (
                {
                    isAnyCards: prevState.isAnyCards.concat(obj),
                    isAnyCard: true
                })
            )
        }
    }

    toFoundPopup() {
        this.setState((prevState) => ({
            isCardFound: !prevState.isCardFound
        }))
    }

    toNotCorrectPopup() {
        this.setState((prevState) => ({
            isCardCorrect: !prevState.isCardCorrect
        }))
    }

    _toClearState() {
        this.setState({
            isFormValid: false,
            formControls: {
                card: {
                    value: '',
                    type: '',
                    label: '',
                    errorMessage: 'Insert correct card number',
                    maximumLength:19,
                    valid: false,
                    validation: {
                        number: true,
                        length: 19
                    }
                },
                cardCode: {
                    value: '',
                    type: '',
                    label: '',
                    errorMessage: 'Insert correct code',
                    maximumLength:3,
                    valid: false,
                    validation: {
                        number: true,
                        length: 3
                    }
                }
            }
        })
    }


    submitHandler = (event) => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if(validation.number) {
            let val = +value
            isValid = is.number(val) && isValid
        }

        if(validation.length) {
            isValid = value.length >= validation.length && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }



    renderInputs() {

        return Object.keys(this.state.formControls).map((controlName, index) => {

            const control = this.state.formControls[controlName]

            return (
                <div className={classes.input}>

                    <Input
                        key={controlName + index}

                        type={control.type}
                        id={control.type}
                        value={control.value}
                        errorMessage={control.errorMessage}
                        maxLength={control.maximumLength}
                        onChange={event => this.onChangeHandler(event,controlName)}
                    />
                    {
                        !control.valid
                            ? <Span>{control.errorMessage}</Span>
                            : <Span styled='visibility: hidden;' />
                    }

                </div>
            )
        })
    }

    renderPopup(label) {
        return (
            <PopupCustom label={label}/>
        )
    }

    renderDivCard() {

        return (this.state.isAnyCards).map((card,index) => {
            const secretNumber = `**** **** **** **** ${card.number.slice(16)}`
            const discount = `${String(card.discount)},00`

            return (
                <div key={index} className={classes.cardDiv}>
                    <div>
                        <p>Gift card</p>
                        <p>{secretNumber}</p>
                    </div>
                    <p>
                        -&#8364;{discount}
                    </p>
                </div>
            )
        })
    }

    render() {


        return (
            <div>
                <form onSubmit={this.submitHandler} className={classes.form}>

                    <p className={classes.title}>Please enter the 19-digit number and code from your gift card below</p>

                    {
                        this.state.isAnyCard
                        ? this.renderDivCard(this.state.isAnyCards)
                        :null
                    }

                    <div className={classes.block}>
                        {this.renderInputs()}
                    </div>


                        {
                            this.state.isCardCorrect
                            ? this.renderPopup('Your card is not accepted. Please try another card number or card code')
                            : null
                        }

                        {
                            this.state.isCardFound
                            ? this.renderPopup('Your card is accepted successfully!')
                            : null
                        }


                    <Button
                        primary
                        onClick={this.applyHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Apply
                    </Button>

                </form>



            </div>
        )
    }
}

export default CardForm
