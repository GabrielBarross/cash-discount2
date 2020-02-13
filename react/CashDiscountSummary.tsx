import React, { useState, useEffect } from 'react'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage, defineMessages } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

const CashDiscountSummary: StorefrontFunctionComponent<Props> = ({ percentageNumber, minimumPrice }) => {
    const runtime = useRuntime()
    const {
        culture: { customCurrencySymbol }
    } = runtime

    const { selectedItem } = useProductSummary()
    const [cashPrice, setCashPrice] = useState<string>('')
    let price: number = 0;

    if (selectedItem) {
        const percentage = percentageNumber / 100
        price = selectedItem.sellers[0].commertialOffer.Price
        useEffect(() => {
            const discountResult = price * percentage
            setCashPrice((price - discountResult).toFixed(2).replace(".", ","))
        }, [percentageNumber])
    }

    const CSS_HANDLES_CASH = ['cashContainer', 'cashText', 'cashNumber']
    const handles = useCssHandles(CSS_HANDLES_CASH)

    if (price >= minimumPrice && cashPrice != price.toString()) {
        return (
            <>
                <div className={`${handles.cashContainer}`}>
                    <p className={`${handles.cashText} f4 c-emphasis ma0`}>
                        <span className={`${handles.cashNumber} b`}>{customCurrencySymbol}{cashPrice}</span>{' '}
                        <FormattedMessage id="store/cash-discount-summary.cash-text" />
                    </p>
                </div>
            </>
        )
    } return <></>
}

interface Props {
    percentageNumber: number,
    minimumPrice: number
}

CashDiscountSummary.defaultProps = {
    percentageNumber: 0,
    minimumPrice: 0
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
        }
    },
}

export default CashDiscountSummary
