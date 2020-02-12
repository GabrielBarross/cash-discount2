import React, { useState, useEffect } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage, defineMessages } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

const CashDiscount: StorefrontFunctionComponent<Props> = ({ percentageNumber, minimumPrice }) => {

  const runtime = useRuntime()
  const {
    culture: { customCurrencySymbol }
  } = runtime

  const { selectedItem } = useProduct()
  const price = selectedItem.sellers[0].commertialOffer.Price
  const [cashPrice, setCashPrice] = useState<string>(price.toFixed(2))
  const percentage = percentageNumber / 100
  useEffect(() => {
    const discountResult = price * percentage
    setCashPrice((price - discountResult).toFixed(2))
  }, [percentageNumber])


  const CSS_HANDLES_CASH = ['cashContainer', 'cashText', 'cashNumber']
  const handles = useCssHandles(CSS_HANDLES_CASH)

  if (price >= minimumPrice && cashPrice != price) {
    return (
      <>
        <div className={`${handles.cashContainer}`}>
          <p className={`${handles.cashText} f4 c-emphasis`}>
            <span className={`${handles.cashNumber} b`}>{customCurrencySymbol}{cashPrice}</span>{' '}
            <FormattedMessage id="store/cash-discount.cash-text" />
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

CashDiscount.defaultProps = {
  percentageNumber: 0,
  minimumPrice: 0
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.cash-discount.title'
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.cash-discount.description'
  },
  percentagetitle: {
    defaultMessage: '',
    id: 'admin/editor.cash-discount.percentage'
  },
  minimumtitle: {
    defaultMessage: '',
    id: 'admin/editor.cash-discount.minimumprice'
  }
})

CashDiscount.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    percentageNumber: {
      title: messages.percentagetitle.id,
      description: messages.percentagetitle.id,
      type: "number",
      default: 0
    },
    minimumPrice: {
      title: messages.minimumtitle.id,
      description: messages.minimumtitle.id,
      type: "number",
      default: 0
    }
  },
}

export default CashDiscount
