// THIS IS FINAL

const ReformatCookies = cookies => {
        const formatCookie = cookie => {
        return `{
            domain: '${cookie.domain}',
            name: '${cookie.name}',
            expiration: ${cookie.expiration},
            host: ${cookie.host},
            http: ${cookie.http},
            site: '${cookie.site}',
            session: ${cookie.session},
            storeid: '${cookie.storeid}'
            }`;
            };
  
        const formatCookies = cookies => {
            return cookies.map(formatCookie).join(',\n');
            };

        const query = cookies => {
            return `db.cookiedb.insertMany([\n${formatCookies(cookies)}\n])`;
            };

        const text = query(cookies);
        console.log(text);
};

module.exports = ReformatCookies;
    