import React, { useState, useEffect } from 'react'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'
import { useCssHandles } from 'vtex.css-handles'
import { defineMessages } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

const CSS_HANDLES_CASH = ['cashContainer', 'cashText', 'cashNumber']
const CashDiscountSummary: StorefrontFunctionComponent<Props> = ({ percentageNumber, minimumPrice, discountDescription }) => {
    const runtime = useRuntime()
    const {
        culture: { customCurrencySymbol }
    } = runtime

    const { selectedItem } = useProductSummary()
    const [cashPrice, setCashPrice] = useState<string>('')
    const [price, setPrice] = useState<number>(0)


    useEffect(() => {
        if (selectedItem) {
            let priceCurrent = selectedItem.sellers[0].commertialOffer.Price;
            const percentage = percentageNumber / 100
            const discountResult = priceCurrent * percentage
            setCashPrice((priceCurrent - discountResult).toFixed(2).replace(".", ","))
            setPrice(priceCurrent)
        }
    }, [selectedItem, percentageNumber])



    const handles = useCssHandles(CSS_HANDLES_CASH)

    if (price >= minimumPrice && cashPrice != price.toString() && price != 0) {
        return (
            <div className={`${handles.cashContainer}`}>
                <p className={`${handles.cashText} f4 c-emphasis ma0`}>
                    <span className={`${handles.cashNumber} b`}>{customCurrencySymbol}{cashPrice}{' '}{discountDescription}</span>
                </p>
            </div>
        )
    } return <></>
}

interface Props {
    percentageNumber: number,
    minimumPrice: number,
    discountDescription: string

}

CashDiscountSummary.defaultProps = {
    percentageNumber: 0,
    minimumPrice: 0,
    discountDescription: " A Vista"
}

const messages = defineMessages({
    title: {
        defaultMessage: '',
        id: 'admin/editor.cash-discount-summary.title'
    },
    description: {
        defaultMessage: '',
        id: 'admin/editor.cash-discount-summary.description'
    },
    percentagetitle: {
        defaultMessage: '',
        id: 'admin/editor.cash-discount-summary.percentage'
    },
    minimumtitle: {
        defaultMessage: '',
        id: 'admin/editor.cash-discount-summary.minimumprice'
    },
    descriptiondiscount: {
        defaultMessage: '',
        id: 'admin/editor.cash-discount-summary.descriptiondiscount'
    }
})

CashDiscountSummary.schema = {
    title: messages.title.id,
    description: messages.description.id,
    type: 'object',
    properties: {
        percentageNumber: {
            title: messages.percentagetitle.id,
            type: "number",
            default: 0
        },
        minimumPrice: {
            title: messages.minimumtitle.id,
            type: "number",
            default: 0
        },
        discountDescription: {
            title: messages.descriptiondiscount.id,
            type: "string",
            default: "A Vista"
        }
    },
}

export default CashDiscountSummary
