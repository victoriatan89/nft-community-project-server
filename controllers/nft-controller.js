import OpenseaScraper from 'opensea-scraper';

// scrape all slugs, names and ranks from the top collections from the rankings page
// "type" is one of the following:
// "24h": ranking of last 24 hours: https://opensea.io/rankings?sortBy=one_day_volume
// "7d": ranking of last 7 days: https://opensea.io/rankings?sortBy=seven_day_volume
// "30d": ranking of last 30 days: https://opensea.io/rankings?sortBy=thirty_day_volume
// "total": scrapes all time ranking: https://opensea.io/rankings?sortBy=total_volume
const getRankings = async (req, res) => {
    const type = req.params['type'];
    const options = {
        debug: false,
        logs: false,
        sort: true,
        browserInstance: undefined
    }
    const rankings = await OpenseaScraper.rankings(type, options);
    res.json(rankings);
}

// get basic collection info from the opensea API
const getCollectionBySlug = async (req, res) => {
    const slug = req.params['slug'];
    const basicInfo = await OpenseaScraper.basicInfo(slug);
    res.json(basicInfo);
}

export default (app) => {
    app.get('/api/nft/rankings/:type', getRankings);
    app.get('/api/nft/collection/:slug', getCollectionBySlug);
}