package org.egov.egf.web.adaptor;

import java.lang.reflect.Type;

import org.egov.model.masters.Vendor;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class VendorJsonAdaptor implements JsonSerializer<Vendor> {
    @Override
    public JsonElement serialize(final Vendor vendor, final Type type, final JsonSerializationContext jsc) {
        final JsonObject jsonObject = new JsonObject();
        if (vendor != null) {
            if (vendor.getName() != null)
                jsonObject.addProperty("name", vendor.getName());
            else
                jsonObject.addProperty("name", "");
            if (vendor.getCode() != null)
                jsonObject.addProperty("code", vendor.getCode());
            else
                jsonObject.addProperty("code", "");
            if (vendor.getBank() != null && vendor.getBank().getName() != null)
                jsonObject.addProperty("bank", vendor.getBank().getName());
            else
                jsonObject.addProperty("bank", "");
            if (vendor.getBankaccount() != null)
                jsonObject.addProperty("bankAccount", vendor.getBankaccount());
            else
                jsonObject.addProperty("bankAccount", "");
            if (vendor.getContactPerson() != null)
                jsonObject.addProperty("contactPerson", vendor.getContactPerson());
            else
                jsonObject.addProperty("contactPerson", "");
            if (vendor.getCorrespondenceAddress() != null)
                jsonObject.addProperty("correspondenceAddress", vendor.getCorrespondenceAddress());
            else
                jsonObject.addProperty("correspondenceAddress", "");
            if (vendor.getEgwStatus() != null && vendor.getEgwStatus().getDescription() != null)
                jsonObject.addProperty("status", vendor.getEgwStatus().getDescription());
            else
                jsonObject.addProperty("status", "");
            if (vendor.getEmail() != null)
                jsonObject.addProperty("email", vendor.getEmail());
            else
                jsonObject.addProperty("email", "");
            if (vendor.getIfsccode() != null)
                jsonObject.addProperty("ifscCode", vendor.getIfsccode());
            else
                jsonObject.addProperty("ifscCode", "");
            if (vendor.getMobileNumber() != null)
                jsonObject.addProperty("mobileNumber", vendor.getMobileNumber());
            else
                jsonObject.addProperty("mobileNumber", "");
            if (vendor.getNarration() != null)
                jsonObject.addProperty("narration", vendor.getNarration());
            else
                jsonObject.addProperty("narration", "");
            if (vendor.getPanno() != null)
                jsonObject.addProperty("panNumber", vendor.getPanno());
            else
                jsonObject.addProperty("panNumber", "");
            if (vendor.getPaymentAddress() != null)
                jsonObject.addProperty("paymentAddress", vendor.getPaymentAddress());
            else
                jsonObject.addProperty("paymentAddress", "");
            if (vendor.getRegistrationNumber() != null)
                jsonObject.addProperty("registrationNumber", vendor.getRegistrationNumber());
            else
                jsonObject.addProperty("registrationNumber", "");
            if (vendor.getTinno() != null)
                jsonObject.addProperty("tinNumber", vendor.getTinno());
            else
                jsonObject.addProperty("tinNumber", "");
            jsonObject.addProperty("id", vendor.getId());
        }
        return jsonObject;
    }
}
