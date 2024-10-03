const OrderPaySite = () =>
{
    return(
        <>
            <div className="BillingForm__InputLine-gc3cew-5 kkvEMA"><label
                className="Text__Label-nmegcg-2 hNgmsK BillingForm__InputField-gc3cew-2 lckdxV">
                <div className="Text__LabelText-nmegcg-3 woWuc">E-mail adresse</div>
                <div className="Text__InputWrapper-nmegcg-0 imrzAW"><input name="email" type="text"
                                                                           aria-label="E-mail adresse"
                                                                           className="Text__Input-nmegcg-1 iKlnta BillingForm__InputField-gc3cew-2 lckdxV"
                                                                           value=""/>
                    <div className="Text__ValidationGraphic-nmegcg-5 hiGhoP"></div>
                </div>
            </label>
                <div className="BillingForm__Note-gc3cew-6 eUIjqi">Vi sender ordreinformation og ordrebekræftelse til
                    din email
                </div>
            </div>
            <div className="grid__Row-sc-18ibg2x-2 iNUwCA">
                <div className="grid__Column-sc-18ibg2x-3 hPaRCT">
                    <div className="BillingForm__InputLine-gc3cew-5 kkvEMA"><label
                        className="Text__Label-nmegcg-2 hNgmsK BillingForm__InputField-gc3cew-2 lckdxV">
                        <div className="Text__LabelText-nmegcg-3 woWuc">Fornavn</div>
                        <div className="Text__InputWrapper-nmegcg-0 imrzAW"><input aria-label="Fornavn"
                                                                                   name="billingAddress.firstName"
                                                                                   type="text" maxLength={30}
                                                                                   className="Text__Input-nmegcg-1 iKlnta BillingForm__InputField-gc3cew-2 lckdxV"
                                                                                   value=""/>
                            <div className="Text__ValidationGraphic-nmegcg-5 hiGhoP"></div>
                        </div>
                    </label></div>
                </div>
                <div className="grid__Column-sc-18ibg2x-3 hPaRCT">
                    <div className="BillingForm__InputLine-gc3cew-5 kkvEMA"><label
                        className="Text__Label-nmegcg-2 hNgmsK BillingForm__InputField-gc3cew-2 lckdxV">
                        <div className="Text__LabelText-nmegcg-3 woWuc">Efternavn</div>
                        <div className="Text__InputWrapper-nmegcg-0 imrzAW"><input aria-label="Efternavn"
                                                                                   name="billingAddress.lastName"
                                                                                   type="text" maxLength={30}
                                                                                   className="Text__Input-nmegcg-1 iKlnta BillingForm__InputField-gc3cew-2 lckdxV"
                                                                                   value=""/>
                            <div className="Text__ValidationGraphic-nmegcg-5 hiGhoP"></div>
                        </div>
                    </label></div>
                </div>
            </div>

            <div className="grid__Row-sc-18ibg2x-2 iNUwCA">
                <div className="grid__Column-sc-18ibg2x-3 jcJEZr">
                    <div className="BillingForm__InputLine-gc3cew-5 kkvEMA"><label
                        className="Text__Label-nmegcg-2 hNgmsK BillingForm__InputField-gc3cew-2 lckdxV">
                        <div className="Text__LabelText-nmegcg-3 woWuc">Adresse</div>
                        <div className="Text__InputWrapper-nmegcg-0 imrzAW"><input aria-label="Adresse"
                                                                                   name="billingAddress.addressLine"
                                                                                   type="text" maxLength={30}
                                                                                   className="Text__Input-nmegcg-1 iKlnta BillingForm__InputField-gc3cew-2 lckdxV"
                                                                                   value=""/>
                            <div className="Text__ValidationGraphic-nmegcg-5 hiGhoP"></div>
                        </div>
                    </label></div>
                </div>
                <div className="grid__Column-sc-18ibg2x-3 ejwWyT">
                    <div className="BillingForm__InputLine-gc3cew-5 kkvEMA"><label
                        className="Text__Label-nmegcg-2 hNgmsK BillingForm__InputField-gc3cew-2 lckdxV">
                        <div className="Text__LabelText-nmegcg-3 woWuc">Hus nr.</div>
                        <div className="Text__InputWrapper-nmegcg-0 imrzAW"><input aria-label="Hus nr."
                                                                                   name="billingAddress.addressNumber"
                                                                                   type="text" maxLength={30}
                                                                                   className="Text__Input-nmegcg-1 iKlnta BillingForm__InputField-gc3cew-2 lckdxV"
                                                                                   value=""/>
                            <div className="Text__ValidationGraphic-nmegcg-5 hiGhoP"></div>
                        </div>
                    </label></div>
                </div>
            </div>
            <div className="BillingForm__InputLine-gc3cew-5 kkvEMA"><label
                className="Text__Label-nmegcg-2 hNgmsK BillingForm__InputField-gc3cew-2 cIsZuK">
                <div className="Text__LabelText-nmegcg-3 woWuc">Mobilnummer</div>
                <div className="Text__InputWrapper-nmegcg-0 imrzAW"><input aria-label="Mobilnummer" name="phoneNumber"
                                                                           type="tel" maxLength={8}
                                                                           className="Text__Input-nmegcg-1 iKlnta BillingForm__InputField-gc3cew-2 cIsZuK"
                                                                           value=""/>
                    <div className="Text__ValidationGraphic-nmegcg-5 hiGhoP"></div>
                </div>
            </label>
                <div className="BillingForm__Note-gc3cew-6 eUIjqi"> Vi vil kun bruge dit mobil nr. hvis der opstår
                    problemer med din ordre.
                </div>
            </div>

        </>
    )
};

export default OrderPaySite;