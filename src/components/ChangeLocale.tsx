function ChangeLocale(locale: LocaleType) {
    return ( 
        <button>
            <img src={locale.icon} alt={locale.locale}></img>
        </button>
    );
}

export default ChangeLocale;