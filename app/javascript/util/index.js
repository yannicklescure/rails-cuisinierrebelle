export const origin = (uri) => {
  console.log(uri)
  return uri.match(/^(?:.*:\/\/)?(?:www\.)?([^:\/]*).*$/)[1]
}

export const truncateText = (text, length, clamp) => {
    // length = length || 150;
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    var content = node.textContent;
    // return content.length > length ? content.slice(0, length) + clamp : content;
    if ((/^(.+)(?:[\s,])/).test(content)) {
      return content.length > length ? content.slice(0, length).match(/^(.+)(?:[\s,])/)[1] + clamp : content;
    }
    else {
      return text
    }
}

export const hashtagMD = (text) => {
  // "[#{word}](/hashtag/#{word.gsub('#', '')})"
  let str = []
  text.split(' ').forEach(word => {
    if ((/^#.+|.*\n#.+/).test(word)) {
      if ((/^\n#.+/).test(word)) {
        // console.log(word)
        str.push('\n')
        word = word.replace('\n', '')
      }
      if ((/.*\n#.+/).test(word)) {
        // console.log(word)
        const temp = word.split('#')
        str.push(temp[0])
        word = `#${temp[1]}`
      }
      // console.log(word)
      if ((/(?:\.$)/).test(word)) str.push(`[${word.replace('.', '')}](/hashtag/${word.replace('.', '').replace('#', '')}).`)
      else if ((/(?:,$)/).test(word)) str.push(`[${word.replace(',', '')}](/hashtag/${word.replace(',', '').replace('#', '')}),`)
      else str.push(`[${word}](/hashtag/${word.replace('#', '')})`)
    }
    else str.push(word)
  })
  // console.log(str.join(' '))
  return str.join(' ')
  // return this.item.content
}

export const filterDate = (timestamp) => {
  const d = new Date()
  const date = d.setDate(d.getDate() - timestamp);
  // console.log(new Date(date))
  return date
}

export const sortItemsDesc = (items) => {
  // console.log(items)
  return items.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
}

export const host = (url) => {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export const humanTime = (timestamp) => {
  return new Date(timestamp)
}

export const userCreatedAt = (timestamp) => {
  // console.log(timestamp)
  if (!timestamp) return null
  const date = new Date(timestamp)
  const year = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(date)
  const month = new Intl.DateTimeFormat('fr', { month: 'long' }).format(date)
  const day = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(date)

  return `${month} ${year}`
}

const round = (value, precision) => {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

const strWithSpaces = (str) => {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const shortenNumber = (number) => {
  // number += 1231
  // number += 10099
  // number += 12345.6789
  // number += 123456789.01
  // console.log(number)
  if (number >= 1000000) return `${strWithSpaces(round(number/1000000, 1))} M`
  if (number >= 10000) return `${strWithSpaces(round(number/1000, 1))} k`
  else return strWithSpaces(number)
}

export const timeAgo = (time) => {
  const between = (Date.now() - Number(time)) / 1000
  if (between < 3600) {
    return 'il y a ' + pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return 'il y a ' + pluralize(~~(between / 3600), ' heure')
  } else {
    return 'il y a ' + pluralize(~~(between / 86400), ' jour')
  }
}

const pluralize = (time, label) => {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export const comments = (count) => {
  return pluralize(count, ' commentaire')
}

export const truncate = (text, length, clamp) => {
  length = length || 150;
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  // return content.length > length ? content.slice(0, length) + clamp : content;
  return content.length > length ? content.slice(0, length).match(/^(.+)(?:[\s,])/)[1] + clamp : content;
}
