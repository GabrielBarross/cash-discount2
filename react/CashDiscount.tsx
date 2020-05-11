import React, { useState, useEffect } from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { useCssHandles } from 'vtex.css-handles'
import { defineMessages } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'

const CSS_HANDLES_CASH = ['cashContainer', 'cashText', 'cashNumber']
const CashDiscount: StorefrontFunctionComponent<Props> = ({
  percentageNumber,
  minimumPrice,
  discountDescription,
}) => {
  const { selectedItem } = useProduct()
  const price = selectedItem?.sellers?.[0]?.commertialOffer?.Price ?? 0
  const [cashPrice, setCashPrice] = useState<string>(price.toFixed(2))
  const percentage = percentageNumber / 100
  useEffect(() => {
    if (selectedItem) {
      const discountResult = price * percentage
      setCashPrice((price - discountResult).toFixed(2))
    }
  }, [selectedItem, percentageNumber, price, percentage])

  const handles = useCssHandles(CSS_HANDLES_CASH)

  if (price >= minimumPrice && cashPrice != price && price != 0) {
    return (
      <div className={`${handles.cashContainer}`}>
        <p className={`${handles.cashText} f4 c-emphasis ma0`}>
          <span className={`${handles.cashNumber} b`}>
            <FormattedCurrency value={cashPrice} /> {discountDescription}
          </span>
        </p>
      </div>
    )
  }
  return <></>
}

interface Props {
  percentageNumber: number
  minimumPrice: number
  discountDescription: string
}

CashDiscount.defaultProps = {
  percentageNumber: 0,
  minimumPrice: 0,
  discountDescription: ' A Vista',
}

const messages = defineMessages({
  title: {
    defaultMessage: '',
    id: 'admin/editor.cash-discount.title',
  },
  description: {
    defaultMessage: '',
    id: 'admin/editor.cash-discount.description',
  },
  percentagetitle: {
    defaultMessage: '',
    id: 'admin/editor.cash-discount.percentage',
  },
  minimumtitle: {
    defaultMessage: '',
    id: 'admin/editor.cash-discount.minimumprice',
  },
  descriptiondiscount: {
    defaultMessage: '',
    id: 'admin/editor.cash-discount-summary.descriptiondiscount',
  },
})

CashDiscount.schema = {
  title: messages.title.id,
  description: messages.description.id,
  type: 'object',
  properties: {
    percentageNumber: {
      title: messages.percentagetitle.id,
      description: messages.percentagetitle.id,
      type: 'number',
      default: 0,
    },
    minimumPrice: {
      title: messages.minimumtitle.id,
      description: messages.minimumtitle.id,
      type: 'number',
      default: 0,
    },
    discountDescription: {
      title: messages.descriptiondiscount.id,
      type: 'string',
      default: 'A Vista',
    },
  },
}

export default CashDiscount
