"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  TrendingUp,
  DollarSign,
  Shield,
  Target,
  CheckCircle,
  XCircle,
  Calculator,
  PieChart,
  BarChart3,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";

const FinancialHealthAnalyzer = () => {
  const [formData, setFormData] = useState({
    monthly_income: "",
    monthly_expenses: "",
    savings_amount: "",
    debt_amount: "",
    credit_score: "",
    age: "",
    emergency_fund_months: "",
    investment_amount: "",
    employment_stability_years: "",
    number_of_dependents: "",
    credit_utilization: "",
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  // Deployed ML model API URL
  const API_BASE_URL = "https://financial-health-api-482p.onrender.com";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    // Basic validation for required fields
    const requiredFields = [
      "monthly_income",
      "monthly_expenses",
      "savings_amount",
      "debt_amount",
      "credit_score",
      "age",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field] || formData[field] === ""
    );

    if (missingFields.length > 0) {
      setError(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      setLoading(false);
      return;
    }

    try {
      // Filter out empty optional fields
      const filteredData = Object.entries(formData).reduce(
        (acc, [key, value]) => {
          if (value !== "" && value !== null && value !== undefined) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResults(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-amber-600";
    if (score >= 20) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBackground = (score) => {
    if (score >= 80)
      return "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200";
    if (score >= 60)
      return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200";
    if (score >= 40)
      return "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200";
    if (score >= 20)
      return "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200";
    return "bg-gradient-to-br from-red-50 to-red-100 border-red-200";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200 shadow-sm";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200 shadow-sm";
      case "low":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 shadow-sm";
    }
  };

  // Required fields data
  const requiredFieldsData = [
    {
      name: "monthly_income",
      label: "Monthly Income",
      placeholder: "$5,000",
      icon: DollarSign,
    },
    {
      name: "monthly_expenses",
      label: "Monthly Expenses",
      placeholder: "$3,000",
      icon: DollarSign,
    },
    {
      name: "savings_amount",
      label: "Current Savings",
      placeholder: "$10,000",
      icon: PieChart,
    },
    {
      name: "debt_amount",
      label: "Total Debt",
      placeholder: "$2,000",
      icon: BarChart3,
    },
    {
      name: "credit_score",
      label: "Credit Score",
      placeholder: "720",
      icon: TrendingUp,
      min: 300,
      max: 850,
    },
    {
      name: "age",
      label: "Age",
      placeholder: "30",
      icon: Target,
      min: 18,
      max: 100,
    },
  ];

  // Optional fields data
  const optionalFieldsData = [
    {
      name: "emergency_fund_months",
      label: "Emergency Fund (months)",
      placeholder: "3",
    },
    {
      name: "investment_amount",
      label: "Investment Amount",
      placeholder: "$5,000",
    },
    {
      name: "employment_stability_years",
      label: "Employment Stability (years)",
      placeholder: "2",
    },
    {
      name: "number_of_dependents",
      label: "Number of Dependents",
      placeholder: "0",
    },
    {
      name: "credit_utilization",
      label: "Credit Utilization (0-1)",
      placeholder: "0.30",
      max: 1,
      step: 0.01,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Calculator className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text">
              Financial Health Analyzer
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Get a comprehensive analysis of your financial health with
              AI-powered insights and personalized recommendations
            </p>
            <div className="flex justify-center mt-8 space-x-8 text-sm">
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Analysis
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Secure & Private
              </div>
              <div className="flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Personalized Tips
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center">
                  <DollarSign className="mr-3 h-6 w-6" />
                  Your Financial Information
                </h2>
                <p className="text-blue-100 mt-2">
                  Fill in your details for personalized analysis
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Required Fields */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      Essential Information
                    </h3>
                    <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full border border-red-200">
                      Required
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {requiredFieldsData.map((field) => (
                      <div key={field.name} className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <field.icon className="h-4 w-4 mr-2 text-gray-400" />
                          {field.label}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            required
                            min={field.min || "0"}
                            max={field.max}
                            step="0.01"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 group-hover:bg-white"
                            placeholder={field.placeholder}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Fields Toggle */}
                <div className="border-t pt-6">
                  <button
                    type="button"
                    onClick={() => setShowOptionalFields(!showOptionalFields)}
                    className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-200 border border-gray-200"
                  >
                    <div className="flex items-center">
                      <Info className="h-5 w-5 mr-2 text-gray-600" />
                      <span className="font-medium text-gray-700">
                        Additional Information (Optional)
                      </span>
                    </div>
                    <ArrowRight
                      className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
                        showOptionalFields ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {showOptionalFields && (
                    <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {optionalFieldsData.map((field) => (
                          <div key={field.name} className="group">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                              {field.label}
                            </label>
                            <input
                              type="number"
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              min="0"
                              max={field.max}
                              step={field.step || "0.01"}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 group-hover:bg-white"
                              placeholder={field.placeholder}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing Your Financial Health...
                    </>
                  ) : (
                    <>
                      <Calculator className="h-5 w-5 mr-2" />
                      Analyze My Financial Health
                    </>
                  )}
                </button>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
                      <span className="text-red-800 text-sm">{error}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results && (
              <div className="animate-in slide-in-from-right-4 duration-500">
                {/* Summary Header */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                    <h3 className="text-xl font-bold flex items-center">
                      <Calculator className="mr-3 h-5 w-5" />
                      Financial Health Summary
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col lg:flex-row items-center gap-6">
                    {/* Score Display */}
                    <div
                      className={`flex-1 rounded-xl shadow-md border-2 overflow-hidden ${getScoreBackground(
                        results.financial_health_score
                      )} p-6 text-center`}
                    >
                      <div className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Your Score
                      </div>
                      <div className="relative inline-block">
                        <div
                          className={`text-6xl font-bold ${getScoreColor(
                            results.financial_health_score
                          )} mb-2`}
                        >
                          {results.financial_health_score}
                        </div>
                        <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl -z-10"></div>
                      </div>
                      <div className="text-xl font-bold text-gray-800 mb-1">
                        {results.score_category.category}
                      </div>
                    </div>

                    {/* Score Description */}
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        What Your Score Means
                      </h4>
                      <p className="text-gray-600">
                        {results.score_category.description}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                          80-100: Excellent
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          60-79: Good
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                          40-59: Average
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          0-39: Needs Improvement
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two-column layout for rest of results */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Financial Analysis */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-full">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
                        <h3 className="text-xl font-bold flex items-center">
                          <Shield className="mr-3 h-5 w-5" />
                          Financial Analysis
                        </h3>
                      </div>
                      <div className="p-6 space-y-4">
                        {results.analysis.strengths.length > 0 && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                            <h4 className="font-bold text-emerald-800 mb-3 flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Your Financial Strengths
                            </h4>
                            <ul className="space-y-2">
                              {results.analysis.strengths.map(
                                (strength, index) => (
                                  <li
                                    key={index}
                                    className="text-emerald-700 flex items-start"
                                  >
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    {strength}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        {results.analysis.weaknesses.length > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <h4 className="font-bold text-red-800 mb-3 flex items-center">
                              <XCircle className="h-5 w-5 mr-2" />
                              Areas for Improvement
                            </h4>
                            <ul className="space-y-2">
                              {results.analysis.weaknesses.map(
                                (weakness, index) => (
                                  <li
                                    key={index}
                                    className="text-red-700 flex items-start"
                                  >
                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    {weakness}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        {results.analysis.risk_factors.length > 0 && (
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <h4 className="font-bold text-amber-800 mb-3 flex items-center">
                              <AlertCircle className="h-5 w-5 mr-2" />
                              Risk Factors to Watch
                            </h4>
                            <ul className="space-y-2">
                              {results.analysis.risk_factors.map(
                                (risk, index) => (
                                  <li
                                    key={index}
                                    className="text-amber-700 flex items-start"
                                  >
                                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    {risk}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Key Metrics - Now as cards in a vertical layout */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                        <h3 className="text-xl font-bold flex items-center">
                          <Target className="mr-3 h-5 w-5" />
                          Key Financial Metrics
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 gap-4">
                          {Object.entries(results.key_metrics).map(
                            ([key, metric]) => (
                              <div
                                key={key}
                                className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="text-sm text-gray-600 font-medium">
                                      {metric.label}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {metric.benchmark}
                                    </div>
                                  </div>
                                  <div className="text-3xl font-bold text-gray-900">
                                    {metric.value}%
                                  </div>
                                </div>
                                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                                  <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{
                                      width: `${Math.min(100, metric.value)}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations - Full width at bottom */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mt-6">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
                    <h3 className="text-xl font-bold flex items-center">
                      <Target className="mr-3 h-5 w-5" />
                      Personalized Recommendations
                    </h3>
                    <p className="text-green-100 mt-1 text-sm">
                      Action items to improve your financial health
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-gray-50 to-white flex flex-col h-full"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-bold text-gray-900 text-lg">
                              {rec.title}
                            </h4>
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                                rec.priority
                              )}`}
                            >
                              {rec.priority.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-sm text-blue-600 font-medium mb-2 uppercase tracking-wide">
                            {rec.category}
                          </div>
                          <div className="text-gray-700 leading-relaxed flex-grow">
                            {rec.description}
                          </div>
                          <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                            Learn more
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!results && !loading && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
                <div className="text-gray-400 mb-6">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                    <TrendingUp className="h-12 w-12 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Ready for Your Analysis?
                  </h3>
                  <p className="text-gray-500">
                    Fill out the form to receive your comprehensive financial
                    health report with personalized insights and
                    recommendations.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-8"></div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Analyzing Your Financial Data
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Our AI is processing your information to provide a
                    comprehensive financial health assessment. This usually
                    takes just a few seconds...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthAnalyzer;
