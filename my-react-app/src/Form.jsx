// src/Form.jsx
import React, { useState } from 'react';
import TextBox from './components/TextBox';
import NumericInput from './components/NumericInput';
import Dropdown from './components/Dropdown';
import PhotoInput from './components/PhotoInput';
import VideoInput from './components/VideoInput';
import Checkbox from './components/Checkbox';
import AudioInput from './components/AudioInput';
import './Form.css';
import { useForm } from 'react-hook-form';

const Form = ({ data }) => {
  const [currentScreen, setCurrentScreen] = useState('start_screen');
  const [formData, setFormData] = useState({});
  const [selectedConsentType, setSelectedConsentType] = useState('');
  const [consentValue, setConsentValue] = useState('');

  const { handleSubmit, register } = useForm();

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleNextScreen = () => {
    const nextScreen = data.screens[currentScreen]?.next_screen?.default ?? 'end_screen';
    setCurrentScreen(nextScreen);
  };

  const handlePrevScreen = () => {
    const prevScreen = data.screens[currentScreen]?.previous_screen ?? 'start_screen';
    setCurrentScreen(prevScreen);
  };

  const renderField = (subFieldKey, subFieldData) => {
    const { field_type, display_text, min_value, max_value, default_value, step, unit } = subFieldData;

    switch (field_type) {
      case 'text_entry':
        return (
          <TextBox
            key={subFieldKey}
            label={display_text.en}
            value={formData[subFieldKey] ?? ''}
            onChange={(value) => handleInputChange(subFieldKey, value)}
            placeholder={default_value}
          />
        );
      case 'numeric_entry':
        return (
          <div key={subFieldKey} className="numericinput-container">
            <label>{display_text.en}</label>
            <input
              type="number"
              value={formData[subFieldKey] ?? ''}
              onChange={(e) => handleInputChange(subFieldKey, parseFloat(e.target.value))}
              min={min_value}
              max={max_value}
              step={step}
              placeholder={default_value}
            />
            {unit && <span>{unit}</span>}
          </div>
        );
      case 'dropdown':
        return (
          <Dropdown
            key={subFieldKey}
            label={display_text.en}
            options={subFieldData.options} // Assuming options array is available in subFieldData
            value={formData[subFieldKey] ?? ''}
            onChange={(value) => handleInputChange(subFieldKey, value)}
          />
        );
      case 'photo_entry':
        return (
          <PhotoInput
            key={subFieldKey}
            label={display_text.en}
            onChange={(value) => handleInputChange(subFieldKey, value)}
          />
        );
      case 'video_entry':
        return (
          <VideoInput
            key={subFieldKey}
            label={display_text.en}
            onChange={(value) => handleInputChange(subFieldKey, value)}
          />
        );
      case 'audio_entry':
        return (
          <AudioInput
            key={subFieldKey}
            label={display_text.en}
            onChange={(value) => handleInputChange(subFieldKey, value)}
          />
        );
      default:
        return null;
    }
  };

  const renderFields = () => {
    const fieldKeys = Object.keys(data.screens[currentScreen]?.fields ?? {});
    return fieldKeys.map((fieldKey) => {
      const fieldData = data.screens[currentScreen]?.fields?.[fieldKey];
      return (
        <div key={fieldKey}>
          <h3>{fieldData.display_text.en}</h3>
          {fieldData.display_text.fr && <p className="translation">{fieldData.display_text.fr}</p>}
          {Object.keys(fieldData.sub_fields).map((subFieldKey) =>
            renderField(subFieldKey, fieldData.sub_fields[subFieldKey])
          )}
        </div>
      );
    });
  };

  const renderConsentInput = () => {
    switch (selectedConsentType) {
      case 'text':
        return (
          <TextBox
            label="Text Consent"
            value={consentValue}
            onChange={(value) => setConsentValue(value)}
            placeholder="Enter text consent"
          />
        );
      case 'verbal':
        return <AudioInput label="Verbal Consent" onChange={(value) => setConsentValue(value)} />;
      case 'image':
        return <PhotoInput label="Image Consent" onChange={(value) => setConsentValue(value)} />;
      case 'video':
        return <VideoInput label="Video Consent" onChange={(value) => setConsentValue(value)} />;
      default:
        return null;
    }
  };

  const renderStartScreen = () => {
    const screenData = data.screens[currentScreen];
    return (
      <div>
        <h2>{screenData.display_text.en}</h2>
        {screenData.display_text.fr && <p className="translation">{screenData.display_text.fr}</p>}
        {screenData.notice_text && (
          <>
            <p>{screenData.notice_text.en}</p>
            {screenData.notice_text.fr && <p className="translation">{screenData.notice_text.fr}</p>}
          </>
        )}
        {screenData.user_consent && (
          <div>
            <p>{screenData.user_consent.display_text.en}</p>
            {screenData.user_consent.display_text.fr && <p className="translation">{screenData.user_consent.display_text.fr}</p>}
            <div className="consent-options">
              {screenData.user_consent.type.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={selectedConsentType === type ? 'selected' : ''}
                  onClick={() => setSelectedConsentType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            {selectedConsentType && renderConsentInput()}
          </div>
        )}
        <button type="button" onClick={handleNextScreen} className="next-button">
          Next
        </button>
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <div className="summary-container">
        <h2>Summary</h2>
        <form>
          {Object.keys(formData).map((key) => (
            <div key={key} className="summary-item">
              <label>{key}</label>
              <p>{formData[key]}</p>
            </div>
          ))}
        </form>
      </div>
    );
  };

  return (
    <div className="form-container">
      {currentScreen === 'start_screen' ? (
        renderStartScreen()
      ) : currentScreen === 'end_screen' ? (
        renderSummary()
      ) : (
        <>
          <h2>{data.screens[currentScreen]?.display_text?.en}</h2>
          {data.screens[currentScreen]?.notice_text && <p>{data.screens[currentScreen].notice_text.en}</p>}
          <form>
            {renderFields()}
            <div>
              {currentScreen !== 'start_screen' && (
                <button type="button" onClick={handlePrevScreen}>
                  Previous
                </button>
              )}
              {currentScreen !== 'end_screen' && (
                <button type="button" onClick={handleNextScreen}>
                  Next
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Form;
